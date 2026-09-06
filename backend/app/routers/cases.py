from fastapi import APIRouter, Depends
from app.dependencies import get_current_user

router = APIRouter(prefix="/cases", tags=["Anomaly Cases"])

CASES = [
    {
        "id": "CASE-7801",
        "project_id": "PRJ-2024-001",
        "project_name": "District Rural Road Connectivity Phase II",
        "district": "Varanasi",
        "primary_anomaly": "Cost Escalation & Collusive Bidding",
        "financial_exposure": 42000000,
        "risk_level": "CRITICAL",
        "status": "OPEN"
    },
    {
        "id": "CASE-7802",
        "project_id": "PRJ-2024-002",
        "project_name": "Solar Powered Drinking Water Units",
        "district": "Patna",
        "primary_anomaly": "Ghost Contractor & Unverified Invoices",
        "financial_exposure": 26000000,
        "risk_level": "CRITICAL",
        "status": "UNDER_INVESTIGATION"
    },
    {
        "id": "CASE-7803",
        "project_id": "PRJ-2024-003",
        "project_name": "Urban Health Infrastructure Upgrade",
        "district": "Ahmedabad",
        "primary_anomaly": "Unbalanced Bid Item Rates",
        "financial_exposure": 18500000,
        "risk_level": "HIGH",
        "status": "ESCALATED"
    }
]

@router.get("")
def get_cases(current_user=Depends(get_current_user)):
    return CASES

@router.get("/{case_id}")
def get_case(case_id: str, current_user=Depends(get_current_user)):
    for case in CASES:
        if case["id"] == case_id:
            return case
    return {"detail": "Case not found"}
