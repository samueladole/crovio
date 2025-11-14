import os
from fastapi import FastAPI
from dotenv import load_dotenv
from .api.v1.routers import (
    farmers_router,
    products_router,
    dealers_router,
    prices_router,
    chats_router,
)

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "Backend API")
app = FastAPI(title=APP_NAME)

app.include_router(farmers_router, prefix="/api/v1/farmers", tags=["Farmers"])
app.include_router(products_router, prefix="/api/v1/products", tags=["Products"])
app.include_router(dealers_router, prefix="/api/v1/dealers", tags=["Dealers"])
app.include_router(prices_router, prefix="/api/v1/prices", tags=["Prices"])
app.include_router(chats_router, prefix="/api/v1/chats", tags=["Chats"])
