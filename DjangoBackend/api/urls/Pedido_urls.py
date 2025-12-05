from rest_framework.routers import DefaultRouter
from api.views.Pedido_view import PedidoViewSet

router = DefaultRouter()
router.register(r'pedido', PedidoViewSet, basename='pedido')

urlpatterns = router.urls
