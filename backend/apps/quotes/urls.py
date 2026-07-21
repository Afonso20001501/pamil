from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import QuoteRequestCreateView, QuoteRequestAdminViewSet

router = DefaultRouter()
router.register('gestao', QuoteRequestAdminViewSet, basename='quotes-admin')

urlpatterns = [
    path('pedido/', QuoteRequestCreateView.as_view(), name='quote-create'),
] + router.urls