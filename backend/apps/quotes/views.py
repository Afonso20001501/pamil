from rest_framework import generics, viewsets, permissions
from .models import QuoteRequest
from .serializers import QuoteRequestCreateSerializer, QuoteRequestAdminSerializer


class QuoteRequestCreateView(generics.CreateAPIView):
    """Endpoint público: POST /api/v1/quotes/pedido/"""
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestCreateSerializer
    permission_classes = [permissions.AllowAny]


class QuoteRequestAdminViewSet(viewsets.ModelViewSet):
    """Endpoint interno (staff): gestão dos pedidos recebidos."""
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestAdminSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ['status', 'event_type']