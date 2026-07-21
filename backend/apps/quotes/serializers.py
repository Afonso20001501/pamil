from rest_framework import serializers
from .models import QuoteRequest


class QuoteRequestCreateSerializer(serializers.ModelSerializer):
    """Usado no formulário público do site (POST)."""
    class Meta:
        model = QuoteRequest
        fields = [
            'full_name', 'email', 'phone', 'company', 'event_type',
            'event_date', 'guests_estimate', 'location', 'services',
            'budget_range', 'message',
        ]


class QuoteRequestAdminSerializer(serializers.ModelSerializer):
    """Usado no painel interno para gestão dos pedidos."""
    class Meta:
        model = QuoteRequest
        fields = '__all__'