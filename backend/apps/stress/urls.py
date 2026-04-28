from django.urls import path
from .views import analyze_stress

urlpatterns = [
    path('analyze/', analyze_stress, name='stress-analyze'),
]
