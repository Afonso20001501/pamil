from django.db import models


class SiteSettings(models.Model):
    """Modelo singleton — usado para textos institucionais e estatísticas da Home."""
    company_name = models.CharField('Nome da empresa', max_length=150)
    about_text = models.TextField('Texto "Sobre Nós"')
    mission = models.TextField('Missão', blank=True)
    vision = models.TextField('Visão', blank=True)
    values = models.TextField('Valores', blank=True)
    years_experience = models.PositiveIntegerField('Anos de experiência', default=0)
    events_completed = models.PositiveIntegerField('Eventos realizados', default=0)
    artists_count = models.PositiveIntegerField('Artistas na agência', default=0)
    happy_clients = models.PositiveIntegerField('Clientes satisfeitos', default=0)
    phone = models.CharField('Telefone', max_length=30, blank=True)
    email = models.EmailField('E-mail', blank=True)
    address = models.CharField('Endereço', max_length=250, blank=True)
    instagram_url = models.URLField(blank=True)
    facebook_url = models.URLField(blank=True)
    whatsapp_number = models.CharField(max_length=30, blank=True)

    class Meta:
        verbose_name = 'Configuração do Site'
        verbose_name_plural = 'Configurações do Site'

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    def __str__(self):
        return 'Configurações do Site'