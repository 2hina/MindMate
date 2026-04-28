import random
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from django.utils import timezone


# ── Rule-based AI responses (swap for OpenAI/Claude API call in production) ──
RESPONSES = {
    'stress':  [
        "Stress is your body asking for care 🌱 Try grounding yourself: name 5 things you can see right now.",
        "When stress peaks, try box breathing — inhale 4s, hold 4s, exhale 6s. Do it with me now. 🌿",
    ],
    'anxious': [
        "Anxiety can feel overwhelming, but it always passes. Let's slow down together — one breath at a time. 🌸",
    ],
    'sad':     [
        "I'm really glad you shared that 💜 Sadness is valid, never a weakness. What's weighing on you most?",
        "It's okay to feel sad. Sit with it gently — you don't have to rush through it. I'm here. 🤍",
    ],
    'happy':   [
        "That genuinely warms me 🌟 Celebrating moments like this builds real emotional resilience. What made today special?",
    ],
    'lonely':  [
        "Loneliness is one of the hardest feelings. But right now, you're not alone — I'm here with you. 💙",
    ],
    'help':    [
        "Of course! You can share how you're feeling, try a breathing exercise, or I can suggest some calming techniques. 💚",
    ],
    'default': [
        "I hear you, and your feelings are completely valid. Would you like to try a breathing exercise together? 🌿",
        "Thank you for sharing that with me. Every step forward, no matter how small, is real progress. 💚",
        "You're carrying a lot right now. Let's slow down — one gentle breath together. In... and out. 🌸",
        "Acknowledging how we feel is often the first step to feeling better. I'm right here with you. 🤍",
        "You are not alone in this. I'm proud of you for reaching out today. 🌿",
    ],
}


def _reply(message: str) -> str:
    lower = message.lower()
    if any(w in lower for w in ['stress', 'overwhelm', 'pressure']):
        return random.choice(RESPONSES['stress'])
    if any(w in lower for w in ['anxious', 'anxiety', 'panic', 'worry']):
        return random.choice(RESPONSES['anxious'])
    if any(w in lower for w in ['sad', 'depress', 'cry', 'hopeless']):
        return random.choice(RESPONSES['sad'])
    if any(w in lower for w in ['happy', 'great', 'good', 'excited', 'wonderful']):
        return random.choice(RESPONSES['happy'])
    if any(w in lower for w in ['lonely', 'alone', 'isolated']):
        return random.choice(RESPONSES['lonely'])
    if any(w in lower for w in ['help', 'how', 'what can']):
        return random.choice(RESPONSES['help'])
    return random.choice(RESPONSES['default'])


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def chat(request):
    message = request.data.get('message', '').strip()
    if not message:
        return Response({'detail': 'message field is required.'}, status=400)
    return Response({
        'reply':     _reply(message),
        'timestamp': timezone.now().isoformat(),
    })
