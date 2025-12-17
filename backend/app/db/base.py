"""Import all the models, so that Base has them before being imported by Alembic."""
from app.db.session import Base
from app.models.users import User
from app.models.product import Product
from app.models.dealer import Dealer
from app.models.farmer import Farmer
from app.models.community import Post, Comment
from app.models.crop import DiseaseDetection, SoilAnalysis, PlantingSchedule
