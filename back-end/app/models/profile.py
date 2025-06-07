from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    grade = Column(String, nullable=False)
    city = Column(String, nullable=False)
    region = Column(String, nullable=False)
    guardian_name = Column(String, nullable=True)
    photo = Column(Text, nullable=True)

class Questionnaire(Base):
    __tablename__ = "questionnaires"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, nullable=False)
    learning_test = Column(Text, nullable=True)
    about_student = Column(Text, nullable=True)
    about_guardian = Column(Text, nullable=True)
