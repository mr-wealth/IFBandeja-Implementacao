from rest_framework import viewsets
from api.models.Usuario import Usuario
from api.serializers.Usuario_serializer import UsuarioSerializer, UsuarioCreateSerializer
from api.services.Usuario_service import UsuarioService
from rest_framework.response import Response
from rest_framework import status



class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return UsuarioCreateSerializer
        return UsuarioSerializer

    def perform_create(self, serializer):
        self.instance = UsuarioService.criar_usuario(serializer.validated_data)

    def update(self, request, *args, **kwargs):
        usuario = self.get_object()

        # Forçar que PUT tenha comportamento de PATCH
        partial = True  

        serializer = self.get_serializer(usuario, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        UsuarioService.atualizar_usuario(usuario, serializer.validated_data)

        return Response(
            {"mensagem": "Usuário atualizado com sucesso"},
            status=status.HTTP_200_OK
        )

    def destroy(self, request, *args, **kwargs):
        usuario = self.get_object()
        UsuarioService.deletar_usuario(usuario)
        return Response(
            {"mensagem": "Usuário apagado com sucesso"},
            status=status.HTTP_200_OK
        )