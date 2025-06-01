from pydantic import BaseModel

# Schema da requisição (o que o front manda)
class ChatRequest(BaseModel):
    message: str

# Schema da resposta (o que o back retorna)
class ChatResponse(BaseModel):
    response: str