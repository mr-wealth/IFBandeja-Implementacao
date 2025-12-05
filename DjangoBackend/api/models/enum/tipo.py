from django.db import models

class Tipo(models.IntegerChoices):
    ALUNO = 1, "Aluno"
    SERVIDOR = 2, "Servidor"
    ADMINISTRADOR = 3, "Administrador"
