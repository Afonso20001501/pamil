from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import SiteSettings
from .serializers import SiteSettingsSerializer


class SiteSettingsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        settings_obj, _ = SiteSettings.objects.get_or_create(pk=1, defaults={
            'company_name': 'Nome da Empresa',
            'about_text': 'Actualize este texto no Django Admin.',
        })
        return Response(SiteSettingsSerializer(settings_obj).data)