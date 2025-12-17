from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.crop import DiseaseDetection, SoilAnalysis, PlantingSchedule
from app.schemas.crop import (
    DiseaseDetectionCreate, DiseaseDetectionResponse,
    SoilAnalysisCreate, SoilAnalysisResponse,
    PlantingScheduleCreate, PlantingScheduleResponse, PlantingScheduleUpdate
)
import random # For mocking disease detection if needed

router = APIRouter()

# --- Disease Detection ---

@router.post("/disease-detect", response_model=DiseaseDetectionResponse)
def detect_disease(
    data: DiseaseDetectionCreate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    """
    Mock endpoint for disease detection.
    In production, this would call an ML model or external service.
    """
    # Simulate processing
    detected = "Leaf Blight"
    confidence = 0.95
    recommendation = "Apply fungicide and improve air circulation."
    
    record = DiseaseDetection(
        user_id=UUID(current_user_id),
        image_url=data.image_url,
        detected_disease=detected,
        confidence_score=confidence,
        recommendation=recommendation
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

@router.get("/disease-history", response_model=List[DiseaseDetectionResponse])
def get_disease_history(
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    return db.query(DiseaseDetection).filter(DiseaseDetection.user_id == UUID(current_user_id)).all()

# --- Soil Analysis ---

@router.post("/soil-analysis", response_model=SoilAnalysisResponse)
def add_soil_record(
    data: SoilAnalysisCreate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    record = SoilAnalysis(
        user_id=UUID(current_user_id),
        **data.model_dump()
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

@router.get("/soil-analysis", response_model=List[SoilAnalysisResponse])
def get_soil_history(
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    return db.query(SoilAnalysis).filter(SoilAnalysis.user_id == UUID(current_user_id)).all()

# --- Planting Schedule ---

@router.post("/schedules", response_model=PlantingScheduleResponse)
def create_schedule(
    data: PlantingScheduleCreate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    schedule = PlantingSchedule(
        user_id=UUID(current_user_id),
        **data.model_dump()
    )
    db.add(schedule)
    db.commit()
    db.refresh(schedule)
    return schedule

@router.get("/schedules", response_model=List[PlantingScheduleResponse])
def get_schedules(
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    return db.query(PlantingSchedule).filter(PlantingSchedule.user_id == UUID(current_user_id)).all()
