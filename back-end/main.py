from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import chat
from app.api import profile
from app.api import register
from app.api import login  # 🚀 agora SIM estamos importando login!

from app.models import profile as models
from app.core import database

app = FastAPI()

# Adicionar CORS para permitir que o front (localhost:3000) chame a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🚀 Cria as tabelas (executa no startup)
models.Base.metadata.create_all(bind=database.engine)

# Incluir rotas
app.include_router(chat.router, prefix="/api/chat")
app.include_router(profile.router, prefix="/api/profile")
app.include_router(register.router)
app.include_router(login.router)  # 🚀 agora SIM adiciona login!

# Rota de teste
@app.get("/")
def read_root():
    return {"message": "Dummont IA backend running"}
