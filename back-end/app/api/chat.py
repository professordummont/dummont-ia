from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.message import ChatRequest, ChatResponse
from app.core.pipeline import run_pipeline
from app.core.database import get_db, get_db_client
from app.core.agents.agent_prompt_engineer import AgentPromptEngineer

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    # Cria cliente de acesso ao banco para o agente
    db_client = get_db_client(db)

    # Instancia o agente
    agent = AgentPromptEngineer(db_client)

    # Gera o prompt personalizado
    prompt, thematic = agent.run(
        user_id=request.user_id,
        chat_id=request.chat_id,
        attachment=request.attachment,
        audio=request.audio
    )

    # Executa pipeline com o prompt gerado
    final_lesson = run_pipeline(prompt=prompt)

    # Retorna a resposta final
    return ChatResponse(response=final_lesson)
