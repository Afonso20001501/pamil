from rest_framework import serializers
from .models import Event
from apps.artists.serializers import ArtistMiniSerializer
from apps.services.serializers import ServiceMiniSerializer


class EventSerializer(serializers.ModelSerializer):
    artists = ArtistMiniSerializer(many=True, read_only=True)
    services_used = ServiceMiniSerializer(many=True, read_only=True)
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'event_type', 'event_type_display',
            'description', 'date_start', 'date_end', 'location', 'city',
            'cover_image', 'artists', 'services_used', 'is_featured',
        ]