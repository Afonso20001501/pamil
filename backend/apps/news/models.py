from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User


class NewsPost(models.Model):
    title = models.CharField('Título', max_length=200)
    slug = models.SlugField('Slug', max_length=220, unique=True, blank=True)
    excerpt = models.CharField('Resumo', max_length=300)
    content = models.TextField('Conteúdo')
    cover_image = models.ImageField('Imagem de capa', upload_to='news/')
    author = models.ForeignKey(User, verbose_name='Autor', on_delete=models.SET_NULL, null=True)
    is_published = models.BooleanField('Publicado', default=True)
    published_at = models.DateTimeField('Publicado em', auto_now_add=True)

    class Meta:
        verbose_name = 'Notícia'
        verbose_name_plural = 'Notícias'
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title