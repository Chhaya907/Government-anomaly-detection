from fastapi import APIRouter, Depends
from app.dependencies import get_current_user

router = APIRouter(prefix="/vendors", tags=["Vendors"])

VENDORS = [
    {
        "id": "VND-101",
        "name": "National Infrastructure Solutions Pvt Ltd",
        "projects": 18,
        "total_contract_value": 1850000000,
        "risk_score": 91,
        "risk_level": "CRITICAL",
        "status": "UNDER_REVIEW"
    },
    {
        "id": "VND-102",
        "name": "Bharat Civil Works Ltd",
        "projects": 12,
        "total_contract_value": 940000000,
        "risk_score": 72,
        "risk_level": "HIGH",
        "status": "MONITORED"
    },
    {
        "id": "VND-103",
        "name": "Green Energy Projects India",
        "projects": 9,
        "total_contract_value": 610000000,
        "risk_score": 35,
        "risk_level": "LOW",
        "status": "CLEAR"
    }
]

@router.get("")
def get_vendors(current_user=Depends(get_current_user)):
    return VENDORS

@router.get("/{vendor_id}")
def get_vendor(vendor_id: str, current_user=Depends(get_current_user)):
    for vendor in VENDORS:
        if vendor["id"] == vendor_id:
            return vendor
    return {"detail": "Vendor not found"}
