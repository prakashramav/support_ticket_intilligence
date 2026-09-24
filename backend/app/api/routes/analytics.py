from fastapi import APIRouter

router = APIRouter()

@router.get("/predictions/history")
async def get_history():
    return {"message": "Database not implemented yet. Set up PostgreSQL or MongoDB to store predictions."}

@router.get("/analytics/summary")
async def get_summary():
    return {"message": "Database not implemented yet. Set up PostgreSQL or MongoDB for analytics."}
