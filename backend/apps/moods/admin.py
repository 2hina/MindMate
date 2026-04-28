from django.contrib import admin
from .models import MoodEntry

@admin.register(MoodEntry)
class MoodEntryAdmin(admin.ModelAdmin):
    list_display  = ('user', 'label', 'mood', 'created_at')
    list_filter   = ('label',)
    search_fields = ('user__name', 'user__email', 'note')
    ordering      = ('-created_at',)
