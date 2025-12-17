from typing import Optional
from uuid import UUID
from datetime import datetime, date
from pydantic import BaseModel, ConfigDict

# Disease Detection
class DiseaseDetectionBase(BaseModel):
    image_url: str
    detected_disease: str
    confidence_score: float
    recommendation: Optional[str] = None

class DiseaseDetectionCreate(BaseModel):
    image_url: str
    # Logic might be: Upload image -> Backend processes -> Returns detection -> Backend saves record
    # Or Frontend sends detection result (if client-side model)? assuming backend process for now
    pass

class DiseaseDetectionResponse(DiseaseDetectionBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Soil Analysis
class SoilAnalysisBase(BaseModel):
    ph_level: Optional[float] = None
    nitrogen: Optional[float] = None
    phosphorus: Optional[float] = None
    potassium: Optional[float] = None
    moisture: Optional[float] = None
    location: Optional[str] = None
    notes: Optional[str] = None

class SoilAnalysisCreate(SoilAnalysisBase):
    pass

class SoilAnalysisResponse(SoilAnalysisBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Planting Schedule
class PlantingScheduleBase(BaseModel):
    crop_name: str
    sowing_date: date
    harvest_date_est: Optional[date] = None
    status: str = "Planned"

class PlantingScheduleCreate(PlantingScheduleBase):
    pass

class PlantingScheduleUpdate(BaseModel):
    status: Optional[str] = None
    harvest_date_est: Optional[date] = None

class PlantingScheduleResponse(PlantingScheduleBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
