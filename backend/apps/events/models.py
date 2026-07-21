from django.db import models
from django.utils.text import slugify
from apps.artists.models import Artist
from apps.services.models import Service


class Event(models.Model):
    class EventType(models.TextChoices):
        CORPORATIVO = 'corporativo', 'Evento Corporativo'
        SHOW = 'show', 'Show/Concerto'
        FESTIVAL = 'festival', 'Festival'
        PRIVADO = 'privado', 'Evento Privado'
        CASAMENTO = 'casamento', 'Casamento'
        OUTRO = 'outro', 'Outro'

    title = models.CharField('Título', max_length=180)
    slug = models.SlugField('Slug', max_length=200, unique=True, blank=True)
    event_type = models.CharField('Tipo de evento', max_length=20, choices=EventType.choices)
    description = models.TextField('Descrição')
    date_start = models.DateTimeField('Data/hora de início')
    date_end = models.DateTimeField('Data/hora de fim', blank=True, null=True)
    location = models.CharField('Local', max_length=200)
    city = models.CharField('Cidade', max_length=100)
    cover_image = models.ImageField('Imagem de capa', upload_to='events/covers/')
    artists = models.ManyToManyField(Artist, verbose_name='Artistas', related_name='events', blank=True)
    services_used = models.ManyToManyField(Service, verbose_name='Serviços utilizados', related_name='events', blank=True)
    is_published = models.BooleanField('Publicado', default=True)
    is_featured = models.BooleanField('Destaque', default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'
        ordering = ['-date_start']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title