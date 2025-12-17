from typing import Optional, List
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, ConfigDict

# Comment Schemas
class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: UUID
    post_id: UUID
    author_id: UUID
    created_at: datetime
    
    # Optional: Include author info if needed, or handle in frontend via author_id lookup
    
    model_config = ConfigDict(from_attributes=True)

# Post Schemas
class PostBase(BaseModel):
    title: str
    content: str
    category: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None

class PostResponse(PostBase):
    id: UUID
    author_id: UUID
    likes_count: int
    created_at: datetime
    updated_at: datetime
    comments: List[CommentResponse] = []

    model_config = ConfigDict(from_attributes=True)
