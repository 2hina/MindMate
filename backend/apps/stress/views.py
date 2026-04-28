from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from django.utils import timezone


def _analyze(text: str) -> dict:
    """
    Simple keyword-based stress scoring.
    Replace with a real NLP model (e.g. transformers pipeline) in production.
    """
    lower = text.lower()

    stress_words = [
        'overwhelmed', 'anxious', 'tired', 'exhausted', 'stressed', 'stress',
        'panic', 'panic attack', 'worry', 'worried', 'sad', 'depressed',
        'lonely', 'hopeless', 'burnout', 'burnout', 'angry', 'angry',
        'frustrated', 'helpless', 'numb', 'empty', 'lost',
    ]
    calm_words = [
        'calm', 'happy', 'content', 'peaceful', 'relaxed', 'relax', 'great',
        'wonderful', 'good', 'fine', 'okay', 'grateful', 'thankful',
        'joyful', 'excited', 'hopeful', 'energized', 'refreshed', 'amazing',
    ]

    score = 42  # neutral baseline
    for w in stress_words:
        if w in lower:
            score += 13
    for w in calm_words:
        if w in lower:
            score -= 9

    score = max(5, min(95, score))

    if score < 35:
        level = 'Low'
        tips  = [
            'Your stress is well managed — keep it up!',
            'Maintain your mindfulness routine daily.',
            'Great sleep habits are making a real difference.',
        ]
    elif score < 65:
        level = 'Moderate'
        tips  = [
            'Try 5-minute box breathing every morning.',
            'Take a short walk or movement break every hour.',
            'Limit screen time 1 hour before bedtime.',
        ]
    else:
        level = 'High'
        tips  = [
            'Consider speaking with a mental health professional.',
            'Practice box breathing right now — 4-4-6 pattern.',
            'Reach out to someone you trust; you don\'t have to carry this alone.',
        ]

    return {
        'score':       score,
        'level':       level,
        'tips':        tips,
        'analyzed_at': timezone.now().isoformat(),
    }


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def analyze_stress(request):
    text = request.data.get('text', '').strip()
    if not text:
        return Response({'detail': 'text field is required.'}, status=400)
    if len(text) > 2000:
        return Response({'detail': 'text must be under 2000 characters.'}, status=400)
    result = _analyze(text)
    return Response(result)
