# Agente 1 - Fazedor de prompt
# Aqui você chamaria uma API de LLM ou montaria o prompt na mão (template)

def run(message: str, questionnaire: dict = None, attachment: str = None, audio: str = None) -> tuple:
    # Exemplo simples - gera um prompt mock
    prompt = f"""
    O aluno enviou: {message}
    Questionário: {questionnaire}
    Anexo: {attachment}
    Áudio: {audio}

    Sabendo disso, gere um esqueleto de aula personalizada.
    """
    thematic = "matemática básica"  # Exemplo: temática detectada

    # No futuro → você pode colocar aqui uma LLM que detecta a temática automaticamente

    return prompt, thematic
