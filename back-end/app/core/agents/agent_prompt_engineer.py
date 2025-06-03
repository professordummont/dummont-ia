# agent_prompt_engineer.py

class AgentPromptEngineer:

    def __init__(self):
        # Se quiser, pode carregar modelos de detecção temática, OCR etc.
        pass

    def consolidate_context(self, profile: dict, questionnaires: dict, message: str) -> dict:
        # Junta tudo em um contexto
        context = {
            "student_name": profile.get("student_name"),
            "age": profile.get("age"),
            "grade": profile.get("grade"),
            "city": profile.get("city"),
            "region": profile.get("region"),
            "guardian_name": profile.get("guardian_name"),
            "learning_test": questionnaires.get("learning_test"),
            "about_student": questionnaires.get("about_student"),
            "about_guardian": questionnaires.get("about_guardian"),
            "chat_message": message
        }
        return context

    def detect_thematic(self, thematic_input: str = None, attachment: str = None, message: str = None) -> str:
        if thematic_input:
            return thematic_input  # Se o usuário informou

        if attachment:
            # TODO: Implementar OCR e análise semântica no futuro
            thematic = "tema_detectado_por_ocr"
        else:
            if message and "fração" in message.lower():
                thematic = "matemática - frações"
            else:
                thematic = "tema_geral"

        return thematic

    def build_prompt(self, context: dict, thematic: str) -> str:
        # Monta o prompt estruturado
        prompt = f"""
        [Perfil do aluno]
        Nome: {context['student_name']}
        Idade: {context['age']}
        Ano letivo: {context['grade']}
        Cidade: {context['city']}
        Região: {context['region']}
        Nome do responsável: {context['guardian_name']}

        [Teste de aprendizagem do aluno]
        {context['learning_test']}

        [Sobre o aluno]
        {context['about_student']}

        [Sobre o responsável]
        {context['about_guardian']}

        [Mensagem inicial no chat]
        {context['chat_message']}

        [Temática detectada]
        {thematic}

        [Objetivo]
        Gere um esqueleto de aula personalizada para este aluno, adequada ao seu perfil de aprendizado, suas preferências e dificuldades, e à temática em questão.
        A estrutura da aula deve otimizar o engajamento e a assimilação, respeitando o nível de desenvolvimento do aluno.
        """
        return prompt

    def run(self, profile: dict, questionnaires: dict, message: str, thematic_input: str = None, attachment: str = None, audio: str = None) -> tuple:
        # Pipeline do agente:

        # Etapa 1: Consolidar contexto
        context = self.consolidate_context(profile, questionnaires, message)

        # Etapa 2: Detectar temática
        thematic = self.detect_thematic(thematic_input, attachment, message)

        # Etapa 3: Construir prompt
        prompt = self.build_prompt(context, thematic)

        return prompt, thematic
