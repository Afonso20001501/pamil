from django.contrib import admin
from .models import QuoteRequest


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'event_type', 'event_date', 'status', 'created_at']
    list_editable = ['status']
    list_filter = ['status', 'budget_range']
    search_fields = ['full_name', 'email', 'phone']
    readonly_fields = ['created_at']