from django.db import models
from django.utils.text import slugify


class Artist(models.Model):
    class Category(models.TextChoices):
        DJ = 'dj', 'DJ'
        BANDA = 'banda', 'Banda'
        CANTOR = 'cantor', 'Cantor/Cantora'
        DANCA = 'danca', 'Grupo de Dança'
        HUMORISTA = 'humorista', 'Humorista'
        OUTRO = 'outro', 'Outro'

    name = models.CharField('Nome', max_length=150)
    slug = models.SlugField('Slug', max_length=170, unique=True, blank=True)
    category = models.CharField('Categoria', max_length=20, choices=Category.choices)
    bio = models.TextField('Biografia')
    photo = models.ImageField('Foto de perfil', upload_to='artists/photos/')
    cover_image = models.ImageField(
        'Imagem de capa', upload_to='artists/covers/', blank=True, null=True
    )
    instagram_url = models.URLField('Instagram', blank=True)
    facebook_url = models.URLField('Facebook', blank=True)
    youtube_url = models.URLField('YouTube', blank=True)
    spotify_url = models.URLField('Spotify', blank=True)
    is_available = models.BooleanField('Disponível para contratação', default=True)
    is_featured = models.BooleanField('Destaque na Home', default=False)
    order = models.PositiveIntegerField('Ordem de exibição', default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Artista'
        verbose_name_plural = 'Artistas'
        ordering = ['order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name