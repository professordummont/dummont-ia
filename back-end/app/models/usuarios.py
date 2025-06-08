# app/models/usuario.py

from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from app.core.database import Base

class Usuarios(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    senha_hash = Column(String, nullable=False)
    status_ativo = Column(Boolean, default=True)
    data_criacao = Column(TIMESTAMP, server_default=func.now())
