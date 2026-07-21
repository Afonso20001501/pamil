from django.contrib import admin
from .models import GalleryItem


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'media_type', 'event', 'is_featured', 'order']
    list_filter = ['media_type', 'is_featured']
    list_editable = ['order']