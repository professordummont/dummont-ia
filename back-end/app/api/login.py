# back-end/app/api/login.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core.database import SessionLocal
from app.models.usuarios import Usuarios  # importa a classe do model!
import bcrypt

router = APIRouter()

# Pydantic schema para login
class LoginRequest(BaseModel):
    email: str
    senha: str

# Dependency para obter a sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/api/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # LOG → DEBUG: email recebido
    print(f"Tentativa de login para email: {request.email}")

    # Busca o usuário pelo email
    user = db.query(Usuarios).filter(Usuarios.email == request.email).first()

    if not user:
        print("Usuário não encontrado.")
        raise HTTPException(status_code=400, detail="Usuário não encontrado.")

    # Verifica a senha com bcrypt
    if not bcrypt.checkpw(request.senha.encode('utf-8'), user.senha_hash.encode('utf-8')):
        print("Senha incorreta.")
        raise HTTPException(status_code=400, detail="Senha incorreta.")

    # Sucesso → agora RETORNA dados úteis para o front (user_id e nome)
    print("Login realizado com sucesso!")

    return {
        "message": "Login realizado com sucesso!",
        "user_id": user.id,
        "user_nome": user.nome
    }
