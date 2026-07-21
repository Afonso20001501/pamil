from django.contrib import admin
from .models import Artist


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_available', 'is_featured', 'order']
    list_editable = ['is_available', 'is_featured', 'order']
    list_filter = ['category', 'is_available']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']