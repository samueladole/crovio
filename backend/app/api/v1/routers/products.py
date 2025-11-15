from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def list_products():
    return [{"id": 1, "name": "Fertilizer"}]

@router.post('/')
def create_product(product: dict):
    return {"id": 2, **product}

@router.get('/{product_id}')
def get_product(product_id: int):
    return {"id": product_id, "name": "Fertilizer"}

@router.put('/{product_id}')
def update_product(product_id: int, product: dict):
    return {"id": product_id, **product}

@router.delete('/{product_id}')
def delete_product(product_id: int):
    return {"message": f"Product with id {product_id} deleted"}
