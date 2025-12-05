from django.urls import path
from api.views.Login_view import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
]
