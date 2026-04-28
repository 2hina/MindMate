from django.contrib import admin
from .models import Therapist

@admin.register(Therapist)
class TherapistAdmin(admin.ModelAdmin):
    list_display  = ('name', 'specialty', 'rating', 'sessions', 'available')
    list_filter   = ('available', 'specialty')
    search_fields = ('name', 'specialty', 'bio')
    list_editable = ('available',)
