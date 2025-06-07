from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models import profile as models
from app.api import schemas
from app.core.database import SessionLocal

router = APIRouter(prefix="/profile", tags=["Profile"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_profile(profile: schemas.ProfileCreate, db: Session = Depends(get_db)):
    db_profile = models.Profile(**profile.dict())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return {"message": "Perfil salvo com sucesso", "profile_id": db_profile.id}

@router.post("/questionnaire")
def create_questionnaire(q: schemas.QuestionnaireCreate, db: Session = Depends(get_db)):
    db_questionnaire = models.Questionnaire(**q.dict())
    db.add(db_questionnaire)
    db.commit()
    db.refresh(db_questionnaire)
    return {"message": "Questionário salvo com sucesso"}
