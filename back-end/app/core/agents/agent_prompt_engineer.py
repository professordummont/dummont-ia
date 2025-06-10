class AgentPromptEngineer:
    def __init__(self, db_client):
        self.db = db_client  # Cliente com funções para acessar o banco

    def get_context_data(self, user_id: str, chat_id: str) -> dict:
        profile = self.db.get_profile(user_id)
        aprendizagem = self.db.get_questionarios_aprendizagem(user_id)
        gostos = self.db.get_questionarios_gostos(user_id)
        pais = self.db.get_questionarios_pais(user_id)
        mensagens_chat = self.db.get_initial_chat_messages(chat_id, limit=3)

        context = {
            "student_name": profile.student_name if profile else "Nome não encontrado",
            "age": profile.age if profile else "Idade não encontrada",
            "grade": profile.grade if profile else "Ano não encontrado",
            "city": profile.city if profile else "Cidade não encontrada",
            "region": profile.region if profile else "Região não encontrada",
            "guardian_name": profile.guardian_name if profile else "Responsável não encontrado",
            "learning_test": aprendizagem.learning_test if aprendizagem else "Não respondido",
            "about_student": gostos.about_student if gostos else "Não respondido",
            "about_guardian": pais.about_guardian if pais else "Não respondido",
            "chat_messages": mensagens_chat if mensagens_chat else ["Mensagem não encontrada"]
        }
        return context

    def detect_thematic(self, messages: list, attachment: str = None, audio: str = None) -> str:
        # 1. Análise de imagem (OCR futura)
        if attachment:
            return "tema_detectado_por_ocr"

        # 2. Análise de áudio (Speech-to-text)
        if audio:
            text = self.db.process_audio(audio)
            if "fração" in text.lower():
                return "matemática - frações"
            return "tema_geral"

        # 3. Análise de texto das mensagens
        for msg in messages:
            if "fração" in msg.lower():
                return "matemática - frações"
        return "tema_geral"

    def build_prompt(self, context: dict, thematic: str) -> str:
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

[Mensagens iniciais no chat]
{" | ".join(context['chat_messages'])}

[Temática detectada]
{thematic}

[Objetivo]
Gere um esqueleto de aula personalizada para este aluno, adequada ao seu perfil de aprendizado, suas preferências e dificuldades, e à temática em questão.
A estrutura da aula deve otimizar o engajamento e a assimilação, respeitando o nível de desenvolvimento do aluno.
"""
        return prompt

    def run(self, user_id: str, chat_id: str, attachment: str = None, audio: str = None) -> tuple:
        # 1. Consolidar contexto
        context = self.get_context_data(user_id, chat_id)

        # 2. Detectar temática
        thematic = self.detect_thematic(context['chat_messages'], attachment, audio)

        # 3. Gerar prompt
        prompt = self.build_prompt(context, thematic)

        return prompt, thematic
