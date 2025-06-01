from fastapi import APIRouter
from app.models.message import ChatRequest, ChatResponse
from app.core.agents import generate_response

router = APIRouter()

# POST /api/chat/
@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    # Chama o "agent" para gerar resposta
    ai_response = generate_response(request.message)

    # Retorna no formato esperado pelo front
    return ChatResponse(response=ai_response)