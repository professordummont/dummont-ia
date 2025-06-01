# Agente 2 - Especialista
# Aqui você pode ter um "super agente" ou múltiplos especialistas por temática.

def run(prompt: str, thematic: str) -> str:
    # Exemplo simples - gera mock de aula
    lesson = f"""
    [Especialista em {thematic}] Aula personalizada:

    {prompt}

    Conteúdo detalhado: (aqui o especialista encorpa a aula)
    - Introdução ao tema
    - Explicação detalhada
    - Exercícios personalizados
    """
    return lesson
