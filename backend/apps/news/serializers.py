from rest_framework import serializers
from .models import NewsPost


class NewsPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)

    class Meta:
        model = NewsPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content',
            'cover_image', 'author_name', 'published_at',
        ]