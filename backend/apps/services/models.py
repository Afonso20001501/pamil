from django.db import models

from django.db import models
from django.utils.text import slugify


class Service(models.Model):
    title = models.CharField('Título', max_length=120)
    slug = models.SlugField('Slug', max_length=140, unique=True, blank=True)
    short_description = models.CharField('Descrição curta', max_length=200)
    description = models.TextField('Descrição completa')
    icon = models.CharField(
        'Ícone (nome lucide-react)', max_length=60,
        help_text='Ex: speaker, lightbulb, camera'
    )
    cover_image = models.ImageField('Imagem de capa', upload_to='services/')
    order = models.PositiveIntegerField('Ordem de exibição', default=0)
    is_active = models.BooleanField('Activo', default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Serviço'
        verbose_name_plural = 'Serviços'
        ordering = ['order', 'title']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
