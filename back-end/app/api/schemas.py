from pydantic import BaseModel
from typing import Optional

class ProfileCreate(BaseModel):
    student_name: str
    age: int
    grade: str
    city: str
    region: str
    guardian_name: Optional[str]
    photo: Optional[str]

class QuestionnaireCreate(BaseModel):
    profile_id: int
    learning_test: Optional[str]
    about_student: Optional[str]
    about_guardian: Optional[str]
