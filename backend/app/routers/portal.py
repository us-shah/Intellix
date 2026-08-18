from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.models.role import Role
from app.models.client_profile import ClientProfile
from app.models.enrollment import Enrollment
from app.models.project import Project
from app.auth.password import hash_password
from app.auth.dependencies import get_current_user
from app.schemas.portal import StudentRegistration, ClientRegistration, ProfileUpdate

router = APIRouter(prefix="/portal", tags=["Portals"])

def role_id(db: Session, name: str):
    role=db.query(Role).filter(Role.RoleName==name).first()
    if not role: raise HTTPException(500, f"Required role {name} is not seeded")
    return role.RoleID

def create_portal_user(db, data, role_name):
    if db.query(User).filter(User.Email==data.Email).first(): raise HTTPException(400,"Email already exists")
    user=User(FullName=data.FullName, Email=data.Email, Phone=data.Phone, PasswordHash=hash_password(data.Password), RoleID=role_id(db,role_name), IsActive=True)
    db.add(user); db.flush(); return user

@router.post("/students/register")
def student_register(data:StudentRegistration, db:Session=Depends(get_db)):
    user=create_portal_user(db,data,"STUDENT"); db.commit(); db.refresh(user)
    return {"message":"Student registered","user_id":user.UserID}

@router.post("/clients/register")
def client_register(data:ClientRegistration, db:Session=Depends(get_db)):
    user=create_portal_user(db,data,"CLIENT")
    profile=ClientProfile(UserID=user.UserID, CompanyName=data.CompanyName, Industry=data.Industry, Website=data.Website)
    db.add(profile); db.commit(); db.refresh(user)
    return {"message":"Client registered","user_id":user.UserID}

@router.get("/me")
def me(payload=Depends(get_current_user), db:Session=Depends(get_db)):
    user=db.query(User).filter(User.UserID==payload.get("user_id")).first()
    if not user: raise HTTPException(404,"User not found")
    return {"UserID":user.UserID,"FullName":user.FullName,"Email":user.Email,"Phone":user.Phone,"Role":user.role.RoleName if user.role else None}

@router.put("/me")
def update_me(data:ProfileUpdate, payload=Depends(get_current_user), db:Session=Depends(get_db)):
    user=db.query(User).filter(User.UserID==payload.get("user_id")).first()
    if not user: raise HTTPException(404,"User not found")
    user.FullName=data.FullName; user.Phone=data.Phone; db.commit(); db.refresh(user); return user

@router.get("/student/dashboard")
def student_dashboard(payload=Depends(get_current_user), db:Session=Depends(get_db)):
    uid=payload.get("user_id"); enrollments=db.query(Enrollment).filter(Enrollment.StudentID==uid).all()
    return {"enrolled_courses":len(enrollments),"completed_courses":sum(1 for x in enrollments if x.Status=="completed"),"average_progress":round(sum(float(x.ProgressPercent or 0) for x in enrollments)/len(enrollments),2) if enrollments else 0}

@router.get("/client/dashboard")
def client_dashboard(payload=Depends(get_current_user), db:Session=Depends(get_db)):
    uid=payload.get("user_id")
    # Projects currently have no direct UserID relationship; expose a safe starter dashboard.
    profile=db.query(ClientProfile).filter(ClientProfile.UserID==uid).first()
    return {"company":profile.CompanyName if profile else None,"active_projects":0,"open_invoices":0,"open_tickets":0}
