from django.utils.translation import get_language
from rest_framework import serializers
from .models import Artist

CATEGORY_LABELS = {
    'dj': {'pt': 'DJ', 'en': 'DJ'},
    'banda': {'pt': 'Banda', 'en': 'Band'},
    'cantor': {'pt': 'Cantor/Cantora', 'en': 'Singer'},
    'danca': {'pt': 'Grupo de Dança', 'en': 'Dance Group'},
    'humorista': {'pt': 'Humorista', 'en': 'Comedian'},
    'outro': {'pt': 'Outro', 'en': 'Other'},
}


class ArtistSerializer(serializers.ModelSerializer):
    category_display = serializers.SerializerMethodField()

    class Meta:
        model = Artist
        fields = [
            'id', 'name', 'slug', 'category', 'category_display', 'bio',
            'photo', 'cover_image', 'instagram_url', 'facebook_url',
            'youtube_url', 'spotify_url', 'is_available', 'is_featured',
        ]

    def get_category_display(self, obj):
        lang = (get_language() or 'pt')[:2]
        labels = CATEGORY_LABELS.get(obj.category, {})
        return labels.get(lang, obj.get_category_display())


class ArtistMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name', 'slug', 'photo', 'category']