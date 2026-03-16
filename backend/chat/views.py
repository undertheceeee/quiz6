from rest_framework import permissions, views
from rest_framework.response import Response


class AIChatbotView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # A simple, project-specific assistant.
        question = request.data.get('question', '')
        question_lower = (question or '').strip().lower()

        if 'service' in question_lower and 'list' in question_lower:
            answer = "You can see all available services on the Home page. Click any card to view the details."
        elif 'seller' in question_lower and 'apply' in question_lower:
            answer = "Go to the Apply Seller page and submit your request. An admin must approve it first."
        elif 'login' in question_lower or 'signin' in question_lower:
            answer = "Use the Sign In page and enter your email and password. If you don't have an account, sign up first."
        else:
            answer = "I can answer questions about services, seller applications, and your orders in this platform."

        return Response({'question': question, 'answer': answer})
