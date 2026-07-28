from pathlib import Path

from decouple import config, Csv
import dj_database_url


# ============================================================
# BASE
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# ============================================================
# SECURITY
# ============================================================

SECRET_KEY = config('SECRET_KEY')

DEBUG = config(
    'DEBUG',
    default=False,
    cast=bool
)

ALLOWED_HOSTS = config(
    'ALLOWED_HOSTS',
    default='localhost,127.0.0.1',
    cast=Csv()
)


# ============================================================
# CORS
# ============================================================

CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:5173,http://127.0.0.1:5173',
    cast=Csv()
)


# ============================================================
# APPLICATIONS
# ============================================================

INSTALLED_APPS = [
    # Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Terceiros
    'modeltranslation',
    'rest_framework',
    'corsheaders',
    'django_filters',

    # Apps do projecto
    'apps.core',
    'apps.services',
    'apps.artists',
    'apps.events',
    'apps.gallery',
    'apps.news',
    'apps.quotes',
    'apps.contacts',
]


# ============================================================
# MIDDLEWARE
# ============================================================

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',

    # WhiteNoise para ficheiros estáticos em produção
    'whitenoise.middleware.WhiteNoiseMiddleware',

    # CORS
    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',

    # Internacionalização
    'django.middleware.locale.LocaleMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# ============================================================
# URLS
# ============================================================

ROOT_URLCONF = 'projecto.urls'


# ============================================================
# TEMPLATES
# ============================================================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# ============================================================
# WSGI
# ============================================================

WSGI_APPLICATION = 'projecto.wsgi.application'


# ============================================================
# DATABASE
# ============================================================

# Usa DATABASE_URL para PostgreSQL
# Funciona localmente e no Render

# ============================================================
# DATABASE
# ============================================================

if config('DATABASE_URL', default=''):
    # Produção - Render
    DATABASES = {
        'default': dj_database_url.config(
            default=config('DATABASE_URL'),
            conn_max_age=600,
            ssl_require=not DEBUG,
        )
    }
else:
    # Desenvolvimento local - PostgreSQL
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
            'HOST': config('DB_HOST', default='localhost'),
            'PORT': config('DB_PORT', default='5432'),
        }
    }

# ============================================================
# PASSWORD VALIDATION
# ============================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': (
            'django.contrib.auth.password_validation.'
            'UserAttributeSimilarityValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.'
            'MinimumLengthValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.'
            'CommonPasswordValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.'
            'NumericPasswordValidator'
        ),
    },
]


# ============================================================
# INTERNATIONALIZATION
# ============================================================

LANGUAGE_CODE = 'pt'

LANGUAGES = [
    ('pt', 'Português'),
    ('en', 'English'),
]

MODELTRANSLATION_DEFAULT_LANGUAGE = 'pt'
MODELTRANSLATION_LANGUAGES = ('pt', 'en')

TIME_ZONE = 'Africa/Luanda'

USE_I18N = True

USE_TZ = True


# ============================================================
# STATIC FILES
# ============================================================

STATIC_URL = '/static/'

STATIC_ROOT = BASE_DIR / 'staticfiles'


# WhiteNoise
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": (
            "whitenoise.storage."
            "CompressedManifestStaticFilesStorage"
        ),
    },
}


# ============================================================
# MEDIA FILES
# ============================================================

MEDIA_URL = '/media/'

MEDIA_ROOT = BASE_DIR / 'media'


# ============================================================
# DEFAULT PRIMARY KEY
# ============================================================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ============================================================
# DJANGO REST FRAMEWORK
# ============================================================

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': (
        'rest_framework.pagination.PageNumberPagination'
    ),

    'PAGE_SIZE': 12,

    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],

    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}


# ============================================================
# EMAIL
# ============================================================

EMAIL_BACKEND = (
    'django.core.mail.backends.smtp.EmailBackend'
)

EMAIL_HOST = config(
    'EMAIL_HOST',
    default='smtp.gmail.com'
)

EMAIL_PORT = config(
    'EMAIL_PORT',
    default=587,
    cast=int
)

EMAIL_USE_TLS = config(
    'EMAIL_USE_TLS',
    default=True,
    cast=bool
)

EMAIL_HOST_USER = config(
    'EMAIL_HOST_USER',
    default=''
)

EMAIL_HOST_PASSWORD = config(
    'EMAIL_HOST_PASSWORD',
    default=''
)

DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

QUOTE_NOTIFICATION_EMAIL = config(
    'QUOTE_NOTIFICATION_EMAIL',
    default=EMAIL_HOST_USER
)