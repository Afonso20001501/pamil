from modeltranslation.translator import register, TranslationOptions
from .models import Artist


@register(Artist)
class ArtistTranslationOptions(TranslationOptions):
    fields = ('bio',)