from pydantic import BaseModel

from app.schemas.user import UserOut


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user: UserOut


class TokenPayload(BaseModel):
    sub: str  # user_id as string
    role: str
