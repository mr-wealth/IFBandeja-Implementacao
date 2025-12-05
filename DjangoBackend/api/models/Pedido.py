from django.db import models
from api.models.Usuario import Usuario
from api.models.Cardapio import Cardapio

class Pedido(models.Model):
    usuario = models.ForeignKey(
        Usuario,
        related_name="historico",
        on_delete=models.CASCADE
    )
    cardapio = models.ForeignKey(
        Cardapio,
        related_name="pedidos",
        on_delete=models.PROTECT
    )

    data_pedido = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    justificativa = models.CharField(max_length=255, null=True, blank=True)
    retirado = models.BooleanField(default=False)
    tipo = models.IntegerField()

    def __str__(self):
        return f"Pedido #{self.id} - {self.usuario.prontuario}"
