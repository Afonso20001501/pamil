from django.db import models


class ContactMessage(models.Model):
    name = models.CharField('Nome', max_length=150)
    email = models.EmailField('E-mail')
    phone = models.CharField('Telefone', max_length=30, blank=True)
    subject = models.CharField('Assunto', max_length=150)
    message = models.TextField('Mensagem')
    is_read = models.BooleanField('Lida', default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Mensagem de Contacto'
        verbose_name_plural = 'Mensagens de Contacto'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.subject}'