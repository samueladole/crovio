
def test_read_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Crovio API"}

def test_create_user(client, db):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "newuser@example.com",
            "password": "Password123!",
            "first_name": "Test",
            "last_name": "User",
            "accept_terms": True
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert "id" in data

def test_login_user(client, db):
    # First create user
    reg_response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "login@example.com",
            "password": "Password123!",
            "accept_terms": True
        }
    )
    assert reg_response.status_code == 200, f"Registration failed: {reg_response.text}"
    
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "login@example.com",
            "password": "Password123!"
        }
    )
    assert response.status_code == 200, f"Login failed: {response.text}"
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_create_product(authorized_client):
    response = authorized_client.post(
        "/api/v1/products/",
        json={
            "name": "Test Product",
            "price": 99.99,
            "quantity": 10,
            "category": "Seeds"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Product"
    assert float(data["price"]) == 99.99

def test_list_products(client):
    response = client.get("/api/v1/products/")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert isinstance(data["items"], list)

def test_create_post(authorized_client):
    response = authorized_client.post(
        "/api/v1/community/posts",
        json={
            "title": "My Question",
            "content": "How do I grow tomatoes?",
            "category": "Vegetables"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "My Question"

def test_crop_tools(authorized_client):
    response = authorized_client.post(
        "/api/v1/crop/soil-analysis",
        json={
            "ph_level": 6.5,
            "nitrogen": 20.0
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["ph_level"] == 6.5
