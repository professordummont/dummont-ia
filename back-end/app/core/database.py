import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi import Depends

# Carrega variáveis do .env
load_dotenv()

# URL do banco
DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql://dummont_user:dummont_password@localhost:5432/dummont_db'
)

# Engine e sessão
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os models
Base = declarative_base()

# ================================
# Funções utilitárias para o agente
# ================================

from app.models import profile, message

def get_profile(db: Session, user_id: str):
    return db.query(profile.Profile).filter_by(user_id=user_id).first()

def get_questionarios_aprendizagem(db: Session, user_id: str):
    return db.query(profile.QuestionarioAprendizagem).filter_by(user_id=user_id).first()

def get_questionarios_gostos(db: Session, user_id: str):
    return db.query(profile.QuestionarioGostos).filter_by(user_id=user_id).first()

def get_questionarios_pais(db: Session, user_id: str):
    return db.query(profile.QuestionarioPais).filter_by(user_id=user_id).first()

def get_initial_chat_messages(db: Session, chat_id: str, limit: int = 3):
    mensagens = db.query(message.Message)\
        .filter_by(chat_id=chat_id)\
        .order_by(message.Message.timestamp.asc())\
        .limit(limit)\
        .all()
    return [m.content or "" for m in mensagens]

def process_audio(audio_path: str) -> str:
    # Simulação ou futura integração com serviço de transcrição
    return "[áudio convertido em texto - função ainda não implementada]"

# ====================================
# Fábrica de cliente para o agente
# ====================================
def get_db_client(db: Session):
    return {
        "get_profile": lambda user_id: get_profile(db, user_id),
        "get_questionarios_aprendizagem": lambda user_id: get_questionarios_aprendizagem(db, user_id),
        "get_questionarios_gostos": lambda user_id: get_questionarios_gostos(db, user_id),
        "get_questionarios_pais": lambda user_id: get_questionarios_pais(db, user_id),
        "get_initial_chat_messages": lambda chat_id, limit=3: get_initial_chat_messages(db, chat_id, limit),
        "process_audio": lambda path: process_audio(path),
    }

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()