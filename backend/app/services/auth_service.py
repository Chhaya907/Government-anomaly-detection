from sqlalchemy.orm import Session

from app.models.user import User
from app.security import (
    create_access_token,
    hash_password,
    verify_password,
)


def register_user(
    db: Session,
    email: str,
    password: str,
    full_name: str,
    role: str = "CITIZEN",
):
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        return None

    user = User(
        email=email,
        password_hash=hash_password(password),
        full_name=full_name,
        role=role,
        is_active=True,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    if not user.is_active:
        return None

    return user


def create_user_token(user: User) -> str:
    return create_access_token(
        {
            "sub": str(user.id),
            "role": user.role,
        }
    )
