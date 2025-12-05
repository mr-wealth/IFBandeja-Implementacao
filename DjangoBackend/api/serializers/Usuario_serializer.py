from rest_framework import serializers
from api.models.Usuario import Usuario
from api.models.Pedido import Pedido

class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ["id", "status", "data_pedido", "retirado"]


class UsuarioSerializer(serializers.ModelSerializer):
    historico = HistoricoSerializer(many=True, read_only=True)

    class Meta:
        model = Usuario
        fields = [
            "id",
            "prontuario",
            "nome",
            "deve_pagar",
            "bloqueado",
            "tipo",
            "historico",
        ]


class UsuarioCreateSerializer(serializers.ModelSerializer):
    senha = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ["prontuario", "nome", "senha", "tipo"]

    def create(self, validated_data):
        senha = validated_data.pop("senha")
        return Usuario.objects.create_user(
            senha=senha,
            **validated_data
        )
