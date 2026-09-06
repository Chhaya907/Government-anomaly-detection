from fastapi import APIRouter, Depends
from app.dependencies import get_current_user

router = APIRouter(prefix="/projects", tags=["Projects"])

PROJECTS = [
    {
        "id": "PRJ-2024-001",
        "name": "District Rural Road Connectivity Phase II",
        "scheme": "PMGSY",
        "district": "Varanasi",
        "state": "Uttar Pradesh",
        "sanctioned_amount": 850000000,
        "spent_amount": 620000000,
        "progress": 68,
        "status": "IN_PROGRESS",
        "risk_level": "CRITICAL"
    },
    {
        "id": "PRJ-2024-002",
        "name": "Solar Powered Drinking Water Units",
        "scheme": "Jal Jeevan Mission",
        "district": "Patna",
        "state": "Bihar",
        "sanctioned_amount": 420000000,
        "spent_amount": 280000000,
        "progress": 54,
        "status": "IN_PROGRESS",
        "risk_level": "HIGH"
    },
    {
        "id": "PRJ-2024-003",
        "name": "Urban Health Infrastructure Upgrade",
        "scheme": "Ayushman Bharat Infrastructure",
        "district": "Ahmedabad",
        "state": "Gujarat",
        "sanctioned_amount": 310000000,
        "spent_amount": 295000000,
        "progress": 92,
        "status": "COMPLETED",
        "risk_level": "LOW"
    }
]

@router.get("")
def get_projects(current_user=Depends(get_current_user)):
    return PROJECTS

@router.get("/statistics")
def get_project_statistics(current_user=Depends(get_current_user)):
    return {
        "total_projects": len(PROJECTS),
        "total_sanctioned": sum(p["sanctioned_amount"] for p in PROJECTS),
        "total_spent": sum(p["spent_amount"] for p in PROJECTS),
        "critical_projects": len([p for p in PROJECTS if p["risk_level"] == "CRITICAL"])
    }

@router.get("/{project_id}")
def get_project(project_id: str, current_user=Depends(get_current_user)):
    for project in PROJECTS:
        if project["id"] == project_id:
            return project
    return {"detail": "Project not found"}
