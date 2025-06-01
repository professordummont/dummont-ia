# Agente 3 - Pedagógico
# Faz ajustes na aula com base no perfil do aluno (questionário)

def run(raw_lesson: str, questionnaire: dict = None) -> str:
    # Exemplo simples - faz pequenos ajustes
    adjustments = "Ajustes pedagógicos aplicados: uso de linguagem simplificada, exemplos visuais."

    final_lesson = f"""
    {raw_lesson}

    {adjustments}
    """
    return final_lesson
