from django.urls import path
from .views import MoodListCreateView, MoodDestroyView

urlpatterns = [
    path('',       MoodListCreateView.as_view(), name='mood-list-create'),
    path('<int:pk>/', MoodDestroyView.as_view(),  name='mood-destroy'),
]
