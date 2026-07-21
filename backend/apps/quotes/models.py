from django.db import models
from apps.services.models import Service


class QuoteRequest(models.Model):
    class Status(models.TextChoices):
        NOVO = 'novo', 'Novo'
        EM_ANALISE = 'em_analise', 'Em Análise'
        RESPONDIDO = 'respondido', 'Respondido'
        CONVERTIDO = 'convertido', 'Convertido em Cliente'
        RECUSADO = 'recusado', 'Recusado'

    class BudgetRange(models.TextChoices):
        ATE_500K = 'ate_500k', 'Até 500.000 Kz'
        DE_500K_2M = '500k_2m', '500.000 - 2.000.000 Kz'
        DE_2M_5M = '2m_5m', '2.000.000 - 5.000.000 Kz'
        ACIMA_5M = 'acima_5m', 'Acima de 5.000.000 Kz'
        A_DEFINIR = 'a_definir', 'A definir'

    full_name = models.CharField('Nome completo', max_length=150)
    email = models.EmailField('E-mail')
    phone = models.CharField('Telefone', max_length=30)
    company = models.CharField('Empresa', max_length=150, blank=True)
    event_type = models.CharField('Tipo de evento', max_length=100)
    event_date = models.DateField('Data prevista do evento', blank=True, null=True)
    guests_estimate = models.PositiveIntegerField('Nº estimado de convidados', blank=True, null=True)
    location = models.CharField('Local previsto', max_length=200, blank=True)
    services = models.ManyToManyField(Service, verbose_name='Serviços desejados', blank=True)
    budget_range = models.CharField('Faixa de orçamento', max_length=20, choices=BudgetRange.choices, default=BudgetRange.A_DEFINIR)
    message = models.TextField('Mensagem adicional', blank=True)
    status = models.CharField('Estado', max_length=20, choices=Status.choices, default=Status.NOVO)
    internal_notes = models.TextField('Notas internas', blank=True)
    created_at = models.DateTimeField('Recebido em', auto_now_add=True)

    class Meta:
        verbose_name = 'Pedido de Orçamento'
        verbose_name_plural = 'Pedidos de Orçamento'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.full_name} — {self.event_type}'