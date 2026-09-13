from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class UserSession(Base):
    """Server-side login session.

    JWTs identify a session through the ``sid`` claim, but the session can be
    revoked independently in PostgreSQL. This gives Intellix PHP-style session
    control while keeping the API bearer-token flow.
    """

    __tablename__ = "UserSessions"

    SessionID = Column(String(64), primary_key=True)
    UserID = Column(Integer, ForeignKey("Users.UserID", ondelete="CASCADE"), nullable=False, index=True)
    UserAgent = Column(String(500))
    IPAddress = Column(String(100))
    CreatedAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    LastActivityAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    ExpiresAt = Column(DateTime(timezone=True), nullable=False)
    IdleExpiresAt = Column(DateTime(timezone=True), nullable=False)
    RevokedAt = Column(DateTime(timezone=True))

    user = relationship("User")
