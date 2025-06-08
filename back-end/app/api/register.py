# app/api/register.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.usuarios import Usuarios
from passlib.context import CryptContext

# Configuração do bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Criação da rota
router = APIRouter()

# Pydantic schema para request
class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str

# Rota de cadastro
@router.post("/api/register")
def register(usuario: UsuarioCreate):
    db: Session = SessionLocal()

    # Verifica se o email já existe
    existing_user = db.query(Usuarios).filter(Usuario.email == usuario.email).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="Email já cadastrado.")

    # Criptografa a senha
    senha_hash = pwd_context.hash(usuario.senha)

    # Cria o usuário
    novo_usuario = Usuarios(
        nome=usuario.nome,
        email=usuario.email,
        senha_hash=senha_hash
    )

    # Salva no banco
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    db.close()

    return {"message": "Usuário cadastrado com sucesso", "user_id": novo_usuario.id}
