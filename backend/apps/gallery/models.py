from django.db import models
from apps.events.models import Event


class GalleryItem(models.Model):
    class MediaType(models.TextChoices):
        IMAGEM = 'imagem', 'Imagem'
        VIDEO = 'video', 'Vídeo'

    title = models.CharField('Título', max_length=150, blank=True)
    media_type = models.CharField('Tipo', max_length=10, choices=MediaType.choices, default=MediaType.IMAGEM)
    image = models.ImageField('Imagem', upload_to='gallery/', blank=True, null=True)
    video_url = models.URLField('URL do vídeo (YouTube/Vimeo)', blank=True)
    event = models.ForeignKey(
        Event, verbose_name='Evento relacionado', related_name='gallery_items',
        on_delete=models.SET_NULL, blank=True, null=True
    )
    category = models.CharField('Categoria', max_length=100, blank=True)
    is_featured = models.BooleanField('Destaque', default=False)
    order = models.PositiveIntegerField('Ordem', default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Item da Galeria'
        verbose_name_plural = 'Galeria'
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title or f'{self.get_media_type_display()} #{self.pk}'