# app/core/database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Carrega as variáveis do .env
load_dotenv()

# Lê a URL do banco - se não achar no .env, usa a de desenvolvimento local
DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql://dummont_user:dummont_password@localhost:5432/dummont_db'
)

# Cria a engine
engine = create_engine(DATABASE_URL)

# Cria a session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os models
Base = declarative_base()
