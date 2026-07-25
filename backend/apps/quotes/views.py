from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, viewsets, permissions
from .models import QuoteRequest
from .serializers import QuoteRequestCreateSerializer, QuoteRequestAdminSerializer


class QuoteRequestCreateView(generics.CreateAPIView):
    """Endpoint público: POST /api/v1/quotes/pedido/"""
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestCreateSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_notification_email(instance)

    def send_notification_email(self, quote: QuoteRequest):
        services_list = ', '.join(s.title for s in quote.services.all()) or 'Não especificado'

        body = f"""Novo Pedido de Orçamento recebido no site — PalcoVerde

Nome: {quote.full_name}
E-mail: {quote.email}
Telefone: {quote.phone}
Empresa: {quote.company or '—'}

Tipo de evento: {quote.event_type}
Serviços desejados: {services_list}
Data prevista: {quote.event_date or 'A definir'}
Nº de convidados: {quote.guests_estimate or '—'}
Local previsto: {quote.location or '—'}
Faixa de orçamento: {quote.get_budget_range_display()}

Mensagem do cliente:
{quote.message or '(sem mensagem adicional)'}

---
Ver e gerir este pedido no Django Admin.
"""

        try:
            send_mail(
                subject=f'Novo Pedido de Orçamento — {quote.full_name}',
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.QUOTE_NOTIFICATION_EMAIL],
                fail_silently=True,  # não bloqueia a resposta ao cliente se o e-mail falhar
            )
        except Exception as e:
            print(f'Erro ao enviar e-mail de notificação: {e}')


class QuoteRequestAdminViewSet(viewsets.ModelViewSet):
    """Endpoint interno (staff): gestão dos pedidos recebidos."""
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestAdminSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ['status', 'event_type']