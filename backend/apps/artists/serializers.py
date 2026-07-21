from rest_framework import serializers
from .models import Artist


class ArtistSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Artist
        fields = [
            'id', 'name', 'slug', 'category', 'category_display', 'bio',
            'photo', 'cover_image', 'instagram_url', 'facebook_url',
            'youtube_url', 'spotify_url', 'is_available', 'is_featured',
        ]


class ArtistMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name', 'slug', 'photo', 'category']