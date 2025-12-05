from api.models.Cardapio import Cardapio

class CardapioService:

    @staticmethod
    def listar_todos():
        return Cardapio.objects.all()

    @staticmethod
    def buscar_por_id(cardapio_id):
        return Cardapio.objects.get(id=cardapio_id)

    @staticmethod
    def criar_cardapio(data):
        return Cardapio.objects.create(**data)

    @staticmethod
    def atualizar_cardapio(cardapio, data):
        for campo, valor in data.items():
            setattr(cardapio, campo, valor)
        cardapio.save()
        return cardapio

    @staticmethod
    def deletar_cardapio(cardapio):
        cardapio.delete()
