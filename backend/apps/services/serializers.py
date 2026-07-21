from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'short_description', 'description',
            'icon', 'cover_image', 'order',
        ]


class ServiceMiniSerializer(serializers.ModelSerializer):
    """Usado dentro de Event/QuoteRequest para não sobrecarregar a resposta."""
    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'icon']