from rest_framework import serializers
from .models import MoodEntry


class MoodEntrySerializer(serializers.ModelSerializer):
    time_display = serializers.SerializerMethodField()

    class Meta:
        model  = MoodEntry
        fields = ('id', 'mood', 'label', 'note', 'created_at', 'time_display')
        read_only_fields = ('id', 'created_at', 'time_display')

    def get_time_display(self, obj):
        from django.utils import timezone
        from datetime import timedelta
        now  = timezone.now()
        diff = now - obj.created_at
        if diff < timedelta(minutes=1):
            return 'Just now'
        if diff < timedelta(hours=1):
            return f'{int(diff.seconds / 60)} min ago'
        if diff < timedelta(days=1):
            return f'Today {obj.created_at.strftime("%I:%M %p")}'
        if diff < timedelta(days=2):
            return f'Yesterday {obj.created_at.strftime("%I:%M %p")}'
        return f'{diff.days} days ago'
