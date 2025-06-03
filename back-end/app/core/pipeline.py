from app.core.agents.agent_prompt_engineer import AgentPromptEngineer
from app.core.agents import agent_specialist, agent_pedagogical

def run_pipeline(profile: dict, questionnaires: dict, message: str, thematic_input: str = None, attachment: str = None, audio: str = None) -> str:
    # Instanciar o agente 1
    prompt_engineer = AgentPromptEngineer()

    # Agente 1 - Fazedor de prompt
    prompt, thematic = prompt_engineer.run(
        profile=profile,
        questionnaires=questionnaires,
        message=message,
        thematic_input=thematic_input,
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
        questionnaire=questionnaires
    )
    print(f"[Pipeline] Aula final revisada pelo pedagógico.")

    return final_lesson
