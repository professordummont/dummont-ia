from fastapi import APIRouter
from app.models.message import ChatRequest, ChatResponse
from app.core.pipeline import run_pipeline

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    final_lesson = run_pipeline(
        message=request.message,
        questionnaire=request.questionnaire,
        attachment=request.attachment,
        audio=request.audio
    )
    return ChatResponse(response=final_lesson)
