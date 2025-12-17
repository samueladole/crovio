from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.community import Post, Comment
from app.schemas.community import PostCreate, PostUpdate, PostResponse, CommentCreate, CommentResponse

router = APIRouter()

# --- Posts ---

@router.get("/posts", response_model=List[PostResponse])
def list_posts(
    skip: int = 0, 
    limit: int = 20, 
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Post)
    if category:
        query = query.filter(Post.category == category)
    return query.order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

@router.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    new_post = Post(
        **post.model_dump(),
        author_id=UUID(current_user_id)
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.get("/posts/{post_id}", response_model=PostResponse)
def get_post(post_id: UUID, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

# --- Comments ---

@router.post("/posts/{post_id}/comments", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
def create_comment(
    post_id: UUID,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    new_comment = Comment(
        content=comment.content,
        post_id=post_id,
        author_id=UUID(current_user_id)
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment
