from django.db import models
from django.conf import settings

MOOD_CHOICES = [
    ('😊', 'Happy'),
    ('😌', 'Calm'),
    ('😔', 'Sad'),
    ('😤', 'Anxious'),
    ('🥰', 'Grateful'),
    ('😴', 'Tired'),
    ('🤩', 'Excited'),
    ('😡', 'Frustrated'),
]


class MoodEntry(models.Model):
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='moods')
    mood       = models.CharField(max_length=10)
    label      = models.CharField(max_length=40)
    note       = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'mood_entries'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.name} — {self.label} at {self.created_at:%Y-%m-%d %H:%M}'
