from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def list_farmers():
    return [{"id": 1, "name": "John Doe"}]

@router.post('/')
def create_farmer(farmer: dict):
    return {"id": 2, **farmer}

@router.get('/{farmer_id}')
def get_farmer(farmer_id: int):
    return {"id": farmer_id, "name": "John Doe"}


@router.put('/{farmer_id}')
def update_farmer(farmer_id: int, farmer: dict):
    return {"id": farmer_id, **farmer}

@router.delete('/{farmer_id}')
def delete_farmer(farmer_id: int):
    return {"message": f"Farmer with id {farmer_id} deleted"}