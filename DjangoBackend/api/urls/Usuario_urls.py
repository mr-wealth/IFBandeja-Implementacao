from rest_framework.routers import DefaultRouter
from api.views.Usuario_view import UsuarioViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')

urlpatterns = router.urls
