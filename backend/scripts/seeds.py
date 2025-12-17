import sys
import os
from faker import Faker
import random
from uuid import uuid4

# Add backend directory to path so we can import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.models.users import User, UserRole
from app.models.product import Product
from app.models.community import Post, Comment
from app.models.dealer import Dealer
from app.utils.security import hash_password

fake = Faker()

def seed_data():
    db = SessionLocal()
    try:
        print("Seeding data...")
        
        # 1. Users & Profiles
        users = []
        # Create 5 Dealers
        for _ in range(5):
            email = fake.unique.email()
            user = User(
                email=email,
                password_hash=hash_password("password123"),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                username=fake.unique.user_name(),
                role=UserRole.DEALER,
                accept_terms=True,
                location=fake.city()
            )
            db.add(user)
            db.flush() # get ID
            
            dealer = Dealer(
                user_id=user.id,
                business_name=fake.company(),
                description=fake.bs(),
                country="USA",
                city=fake.city(),
                is_verified=True
            )
            db.add(dealer)
            users.append(user)
            
        # Create 10 Regular Users
        for _ in range(10):
            user = User(
                email=fake.unique.email(),
                password_hash=hash_password("password123"),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                username=fake.unique.user_name(),
                role=UserRole.USER,
                accept_terms=True
            )
            db.add(user)
            users.append(user)

        db.commit()
        print(f"Created {len(users)} users.")
        
        # 2. Products (linked to Dealers)
        dealers = [u for u in users if u.role == UserRole.DEALER]
        for dealer in dealers:
            for _ in range(random.randint(3, 8)):
                product = Product(
                    name=fake.catch_phrase(),
                    description=fake.text(),
                    price=random.uniform(10.0, 500.0),
                    quantity=random.randint(10, 100),
                    category=random.choice(["Seeds", "Tools", "Fertilizers", "Pesticides"]),
                    dealer_id=dealer.id,
                    image_url=f"https://picsum.photos/seed/{random.randint(1,1000)}/200/200"
                )
                db.add(product)
        
        # 3. Community Posts & Comments
        categories = ["General", "Vegetables", "Fruits", "Pests", "Market"]
        for _ in range(20):
            author = random.choice(users)
            post = Post(
                author_id=author.id,
                title=fake.sentence(),
                content=fake.paragraph(),
                category=random.choice(categories),
                likes_count=random.randint(0, 50)
            )
            db.add(post)
            db.flush()
            
            # Add comments
            for _ in range(random.randint(0, 5)):
                commentor = random.choice(users)
                comment = Comment(
                    post_id=post.id,
                    author_id=commentor.id,
                    content=fake.sentence()
                )
                db.add(comment)

        db.commit()
        print("Seeding complete!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
