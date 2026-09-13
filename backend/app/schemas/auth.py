from pydantic import BaseModel, EmailStr, Field


class ForgotPasswordRequest(BaseModel):
    Email: EmailStr


class ResetPasswordRequest(BaseModel):
    Token: str
    NewPassword: str = Field(min_length=8, max_length=128)


class ChangePasswordRequest(BaseModel):
    CurrentPassword: str
    NewPassword: str = Field(min_length=8, max_length=128)
