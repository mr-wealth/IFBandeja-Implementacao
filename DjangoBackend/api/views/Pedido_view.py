from rest_framework import viewsets
from api.models.Pedido import Pedido
from api.serializers.Pedido_serializer import PedidoSerializer
from api.services.Pedido_service import PedidoService
from rest_framework.response import Response
from rest_framework import status

class PedidoViewSet(viewsets.ModelViewSet):
    
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

    def perform_create(self, serializer):
        PedidoService.criar_pedido(serializer.validated_data)

    def update(self, request, *args, **kwargs):
        pedido = self.get_object()

        # Forçar que PUT tenha comportamento de PATCH
        partial = True  

        serializer = self.get_serializer(pedido, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        PedidoService.atualizar_pedido(pedido, serializer.validated_data)

        return Response(
            {"mensagem": "Pedido atualizado com sucesso"},
            status=status.HTTP_200_OK
        )

    def destroy(self, request, *args, **kwargs):
        pedido = self.get_object()
        PedidoService.deletar_pedido(pedido)
        return Response(
            {"mensagem": "Pedido apagado com sucesso"},
            status=status.HTTP_200_OK
        )