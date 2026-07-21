from rest_framework import serializers
from .models import GalleryItem


class GalleryItemSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)

    class Meta:
        model = GalleryItem
        fields = [
            'id', 'title', 'media_type', 'image', 'video_url',
            'event', 'event_title', 'category', 'is_featured',
        ]