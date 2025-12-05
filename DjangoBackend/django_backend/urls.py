from django.urls import path, include

urlpatterns = [
    path('', include('api.urls.Usuario_urls')),
    path('', include('api.urls.Cardapio_urls')),
    path('', include('api.urls.Pedido_urls')),
    path('', include('api.urls.Login_urls')),
]
