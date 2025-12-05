from django.db import models

class Cardapio(models.Model):
    data = models.DateField()
    descricao = models.CharField(max_length=255)
    preco = models.FloatField()

    def __str__(self):
        return f"{self.descricao} - R$ {self.preco:.2f}"
