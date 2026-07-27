from django.utils.translation import get_language
from rest_framework import serializers
from .models import Event
from apps.artists.serializers import ArtistMiniSerializer
from apps.services.serializers import ServiceMiniSerializer

EVENT_TYPE_LABELS = {
    'corporativo': {'pt': 'Evento Corporativo', 'en': 'Corporate Event'},
    'show': {'pt': 'Show/Concerto', 'en': 'Show/Concert'},
    'festival': {'pt': 'Festival', 'en': 'Festival'},
    'privado': {'pt': 'Evento Privado', 'en': 'Private Event'},
    'casamento': {'pt': 'Casamento', 'en': 'Wedding'},
    'outro': {'pt': 'Outro', 'en': 'Other'},
}


class EventSerializer(serializers.ModelSerializer):
    artists = ArtistMiniSerializer(many=True, read_only=True)
    services_used = ServiceMiniSerializer(many=True, read_only=True)
    event_type_display = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'event_type', 'event_type_display',
            'description', 'date_start', 'date_end', 'location', 'city',
            'cover_image', 'artists', 'services_used', 'is_featured',
        ]

    def get_event_type_display(self, obj):
        lang = (get_language() or 'pt')[:2]
        labels = EVENT_TYPE_LABELS.get(obj.event_type, {})
        return labels.get(lang, obj.get_event_type_display())