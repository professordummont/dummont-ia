from app.core.agents import agent_prompt_engineer, agent_specialist, agent_pedagogical

def run_pipeline(message: str, questionnaire: dict = None, attachment: str = None, audio: str = None) -> str:
    # Agente 1 - Fazedor de prompt
    prompt, thematic = agent_prompt_engineer.run(
        message=message,
        questionnaire=questionnaire,
        attachment=attachment,
        audio=audio
    )
    print(f"[Pipeline] Prompt criado: {prompt} | Temática detectada: {thematic}")

    # Agente 2 - Especialista
    raw_lesson = agent_specialist.run(
        prompt=prompt,
        thematic=thematic
    )
    print(f"[Pipeline] Aula gerada pelo especialista.")

    # Agente 3 - Pedagógico
    final_lesson = agent_pedagogical.run(
        raw_lesson=raw_lesson,
        questionnaire=questionnaire
    )
    print(f"[Pipeline] Aula final revisada pelo pedagógico.")

    return final_lesson
