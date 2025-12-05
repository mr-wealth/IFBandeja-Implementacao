from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from api.models.Usuario import Usuario
from api.serializers.Usuario_serializer import UsuarioSerializer

class LoginView(APIView):

    def post(self, request):
        prontuario = request.data.get("prontuario")
        senha = request.data.get("senha")

        if not prontuario or not senha:
            return Response({"erro": "Prontuário e senha são obrigatórios"}, status=status.HTTP_400_BAD_REQUEST)

        usuario = authenticate(request, username=prontuario, password=senha)

        if usuario is None:
            return Response({"erro": "Credenciais inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(usuario)

        serializer = UsuarioSerializer(usuario)

        return Response({
            "mensagem": "Login realizado com sucesso",
            "usuario": serializer.data,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)
