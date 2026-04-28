from django.urls import path
from .views import TherapistListView, TherapistDetailView

urlpatterns = [
    path('',        TherapistListView.as_view(),   name='therapist-list'),
    path('<int:pk>/', TherapistDetailView.as_view(), name='therapist-detail'),
]
