from django.utils import timezone
from rest_framework import viewsets, permissions
from django_filters import rest_framework as filters
from .models import Event
from .serializers import EventSerializer


class EventFilter(filters.FilterSet):
    status = filters.CharFilter(method='filter_status')
    artist = filters.NumberFilter(field_name='artists__id')

    class Meta:
        model = Event
        fields = ['event_type', 'city']

    def filter_status(self, queryset, name, value):
        now = timezone.now()
        if value == 'proximos':
            return queryset.filter(date_start__gte=now)
        if value == 'passados':
            return queryset.filter(date_start__lt=now)
        return queryset


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(is_published=True)
    serializer_class = EventSerializer
    lookup_field = 'slug'
    filterset_class = EventFilter
    search_fields = ['title', 'description', 'city']
    ordering_fields = ['date_start']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]