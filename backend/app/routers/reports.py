from fastapi import APIRouter, Depends
from app.dependencies import get_current_user

router = APIRouter(prefix="/reports", tags=["Reports"])

REPORTS = [
    {
        "id": "RPT-001",
        "title": "National Public Expenditure Risk Assessment",
        "type": "NATIONAL",
        "generated_date": "2026-09-06",
        "status": "READY"
    },
    {
        "id": "RPT-002",
        "title": "High Risk Procurement Analysis",
        "type": "FORENSIC",
        "generated_date": "2026-09-05",
        "status": "READY"
    },
    {
        "id": "RPT-003",
        "title": "District Project Compliance Summary",
        "type": "DISTRICT",
        "generated_date": "2026-09-04",
        "status": "READY"
    }
]

@router.get("")
def get_reports(current_user=Depends(get_current_user)):
    return REPORTS

@router.get("/{report_id}")
def get_report(report_id: str, current_user=Depends(get_current_user)):
    for report in REPORTS:
        if report["id"] == report_id:
            return report
    return {"detail": "Report not found"}
