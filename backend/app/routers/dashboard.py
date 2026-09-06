from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/metrics")
def get_dashboard_metrics(current_user: User = Depends(get_current_user)):
    return {
        "monitored_projects": 1420,
        "sanctioned_outlay": 5240,
        "flagged_anomalies": 114,
        "potential_financial_risk": 142.6,
        "risk_distribution": {
            "critical": 18,
            "high": 37,
            "medium": 48,
            "low": 17
        },
        "user_role": current_user.role
    }


@router.get("/recent-alerts")
def get_recent_alerts(current_user: User = Depends(get_current_user)):
    return [
        {
            "case_id": "CASE-7801",
            "project": "District Rural Road Connectivity Phase-II",
            "district": "Varanasi",
            "risk_level": "CRITICAL",
            "financial_exposure": 4.2,
            "status": "OPEN"
        },
        {
            "case_id": "CASE-7802",
            "project": "Solar Powered Drinking Water Units",
            "district": "Patna",
            "risk_level": "CRITICAL",
            "financial_exposure": 2.6,
            "status": "UNDER_INVESTIGATION"
        },
        {
            "case_id": "CASE-7803",
            "project": "Smart Drainage and Stormwater Channel",
            "district": "Pune",
            "risk_level": "HIGH",
            "financial_exposure": 1.85,
            "status": "ESCALATED"
        }
    ]


@router.get("/risk-distribution")
def get_risk_distribution(current_user: User = Depends(get_current_user)):
    return {
        "critical": 18,
        "high": 37,
        "medium": 48,
        "low": 17
    }
