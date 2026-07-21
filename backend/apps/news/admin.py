from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import NewsPost


@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'is_published', 'published_at']
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ['title']