from django.db import models


class Therapist(models.Model):
    name        = models.CharField(max_length=120)
    specialty   = models.CharField(max_length=120)
    bio         = models.TextField(blank=True)
    rating      = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    sessions    = models.PositiveIntegerField(default=0)
    available   = models.BooleanField(default=True)
    avatar_initials = models.CharField(max_length=3, blank=True)
    card_color  = models.CharField(max_length=10, default='#a8e6cf')
    email       = models.EmailField(blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'therapists'
        ordering = ['-rating', 'name']

    def __str__(self):
        return f'{self.name} — {self.specialty}'

    def save(self, *args, **kwargs):
        if not self.avatar_initials:
            parts = self.name.replace('Dr. ', '').strip().split()
            self.avatar_initials = (parts[0][0] + (parts[-1][0] if len(parts) > 1 else '')).upper()
        super().save(*args, **kwargs)
