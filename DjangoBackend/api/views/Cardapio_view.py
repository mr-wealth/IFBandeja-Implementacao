from rest_framework import viewsets
from api.models.Cardapio import Cardapio
from api.serializers.Cardapio_serializer import CardapioSerializer
from api.services.Cardapio_service import CardapioService
from rest_framework.response import Response
from rest_framework import status

class CardapioViewSet(viewsets.ModelViewSet):

    queryset = Cardapio.objects.all()
    serializer_class = CardapioSerializer

    def perform_create(self, serializer):
        CardapioService.criar_cardapio(serializer.validated_data)

    def update(self, request, *args, **kwargs):
        cardapio = self.get_object()

        # Forçar que PUT tenha comportamento de PATCH
        partial = True  

        serializer = self.get_serializer(cardapio, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        CardapioService.atualizar_cardapio(cardapio, serializer.validated_data)

        return Response(
            {"mensagem": "Cardapio atualizado com sucesso"},
            status=status.HTTP_200_OK
        )

    def destroy(self, request, *args, **kwargs):
        cardapio = self.get_object()
        CardapioService.deletar_cardapio(cardapio)
        return Response(
            {"mensagem": "Cardapio apagado com sucesso"},
            status=status.HTTP_200_OK
        )