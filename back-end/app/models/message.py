from pydantic import BaseModel
from typing import Optional, Dict

class ChatRequest(BaseModel):
    message: str
    questionnaire: Optional[Dict] = None  # dict com respostas dos pais/alunos
    attachment: Optional[str] = None      # URL ou base64 da imagem
    audio: Optional[str] = None           # URL ou base64 do áudio

class ChatResponse(BaseModel):
    response: str  # Aula final (texto)
