from rest_framework import viewsets, permissions
from .models import NewsPost
from .serializers import NewsPostSerializer


class NewsPostViewSet(viewsets.ModelViewSet):
    queryset = NewsPost.objects.filter(is_published=True)
    serializer_class = NewsPostSerializer
    lookup_field = 'slug'
    search_fields = ['title', 'excerpt']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]