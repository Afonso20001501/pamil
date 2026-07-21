from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/core/', include('apps.core.urls')),
    path('api/v1/services/', include('apps.services.urls')),
    path('api/v1/artists/', include('apps.artists.urls')),
    path('api/v1/events/', include('apps.events.urls')),
    path('api/v1/gallery/', include('apps.gallery.urls')),
    path('api/v1/news/', include('apps.news.urls')),
    path('api/v1/quotes/', include('apps.quotes.urls')),
    path('api/v1/contacts/', include('apps.contacts.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)