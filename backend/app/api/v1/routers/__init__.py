from .farmers import router as farmers_router
from .dealers import router as dealers_router
from .products import router as products_router
from .prices import router as prices_router
from .chats import router as chats_router
from .auth import router as auth_router
from .community import router as community_router
from .crop import router as crop_router

__all__ = [
    "farmers_router",
    "dealers_router",
    "products_router",
    "prices_router",
    "chats_router",
    "auth_router",
    "community_router",
    "crop_router",
]
