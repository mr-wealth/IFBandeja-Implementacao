from rest_framework import serializers
from api.models.Pedido import Pedido
from api.models.Cardapio import Cardapio
from api.models.Usuario import Usuario

class PedidoSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    cardapio = serializers.PrimaryKeyRelatedField(queryset=Cardapio.objects.all())

    class Meta:
        model = Pedido
        fields = [
            "id",
            "usuario",
            "cardapio",
            "data_pedido",
            "status",
            "justificativa",
            "retirado",
            "tipo"
        ]
