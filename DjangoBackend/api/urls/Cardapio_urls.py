from rest_framework.routers import DefaultRouter
from api.views.Cardapio_view import CardapioViewSet

router = DefaultRouter()
router.register(r'cardapio', CardapioViewSet, basename='cardapio')

urlpatterns = router.urls
