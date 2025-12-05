from api.models.Pedido import Pedido

class PedidoService:

    @staticmethod
    def listar_todos():
        return Pedido.objects.all()

    @staticmethod
    def buscar_por_id(pedido_id):
        return Pedido.objects.get(id=pedido_id)

    @staticmethod
    def criar_pedido(data):
        return Pedido.objects.create(**data)

    @staticmethod
    def atualizar_pedido(pedido, data):
        for campo, valor in data.items():
            setattr(pedido, campo, valor)
        pedido.save()
        return pedido

    @staticmethod
    def deletar_pedido(pedido):
        pedido.delete()
