from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_type', 'date_start', 'city', 'is_published', 'is_featured']
    list_filter = ['event_type', 'is_published', 'city']
    filter_horizontal = ['artists', 'services_used']
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ['title', 'city']