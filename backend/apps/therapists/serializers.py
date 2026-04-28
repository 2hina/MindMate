from rest_framework import serializers
from .models import Therapist


class TherapistSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Therapist
        fields = (
            'id', 'name', 'specialty', 'bio', 'rating', 'sessions',
            'available', 'avatar_initials', 'card_color', 'email',
        )
