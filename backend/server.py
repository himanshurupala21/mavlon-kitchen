from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="MAVLON Kitchen Sink API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class InquiryCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    city: Optional[str] = None
    interest: Optional[str] = None  # product / dealer / general
    message: str


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    city: Optional[str] = None
    interest: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"brand": "MAVLON Kitchen Sink", "status": "online"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    if not payload.name.strip() or not payload.email.strip() or not payload.message.strip():
        raise HTTPException(status_code=400, detail="name, email and message are required")
    inquiry = Inquiry(**payload.model_dump())
    await db.inquiries.insert_one(inquiry.model_dump())
    return inquiry


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    rows = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return rows


# ---------- Products (static catalog served from API for future CMS) ----------
PRODUCTS = [
    {
        "id": "metallic-drainboard-36",
        "name": "Metallic Drain Board",
        "series": "Metallic Series",
        "tagline": "Single bowl, generous drain",
        "size": "36 × 18 × 8.5 inch",
        "weight": "15 kg",
        "thickness": "12 mm",
        "colors": ["Matte Black", "Graphite Grey", "Espresso Brown", "Marble White"],
        "image": "https://customer-assets.emergentagent.com/job_e1464254-557c-465b-8442-90cab2052798/artifacts/vreymh0b_image_1781697871849.png",
        "tags": ["scratch resistant", "heat resistant", "stain resistant"],
    },
    {
        "id": "quartz-workstation-pro",
        "name": "Quartz Workstation Pro",
        "series": "Architect Series",
        "tagline": "Integrated cutting board & rinse grid",
        "size": "32 × 19 × 9 inch",
        "weight": "17 kg",
        "thickness": "14 mm",
        "colors": ["Graphite Grey", "Matte Black"],
        "image": "https://customer-assets.emergentagent.com/job_e1464254-557c-465b-8442-90cab2052798/artifacts/ssbi046c_image_1781697861346.png",
        "tags": ["workstation", "premium accessories"],
    },
    {
        "id": "studio-top-mount",
        "name": "Studio Top Mount",
        "series": "Architect Series",
        "tagline": "Sculpted edge with marble pairing",
        "size": "30 × 18 × 9 inch",
        "weight": "16 kg",
        "thickness": "12 mm",
        "colors": ["Graphite Grey", "Matte Black"],
        "image": "https://customer-assets.emergentagent.com/job_e1464254-557c-465b-8442-90cab2052798/artifacts/fcngw6ly_image_1781697866449.png",
        "tags": ["modern", "ergonomic"],
    },
    {
        "id": "obsidian-double-bowl",
        "name": "Obsidian Double Bowl",
        "series": "Noir Quartz",
        "tagline": "Twin basins, monolithic obsidian finish",
        "size": "37 × 18 × 8.5 inch",
        "weight": "18 kg",
        "thickness": "12 mm",
        "colors": ["Matte Black"],
        "image": "https://customer-assets.emergentagent.com/job_e1464254-557c-465b-8442-90cab2052798/artifacts/vuh81zth_content%20%285%29.png",
        "tags": ["double bowl", "matte"],
    },
]


@api_router.get("/products")
async def list_products():
    return {"products": PRODUCTS, "count": len(PRODUCTS)}


@api_router.get("/products/{product_id}")
async def get_product(product_id: str):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
