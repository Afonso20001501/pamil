from modeltranslation.translator import register, TranslationOptions
from .models import SiteSettings


@register(SiteSettings)
class SiteSettingsTranslationOptions(TranslationOptions):
    fields = ('about_text', 'mission', 'vision', 'values')