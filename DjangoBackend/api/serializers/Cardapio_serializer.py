from rest_framework import serializers
from api.models.Cardapio import Cardapio

class CardapioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cardapio
        fields = ["id", "data", "descricao", "preco"]
