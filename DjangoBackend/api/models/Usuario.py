from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from api.models.enum.tipo import Tipo

class UsuarioManager(BaseUserManager):
    def create_user(self, prontuario, senha=None, **extra_fields):
        if not prontuario:
            raise ValueError("O usuário precisa de um prontuário")

        user = self.model(prontuario=prontuario, **extra_fields)
        user.set_password(senha)
        user.save(using=self._db)
        return user

    def create_superuser(self, prontuario, senha=None, **extra_fields):
        extra_fields.setdefault("tipo", Tipo.ADMINISTRADOR)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(prontuario, senha, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    prontuario = models.CharField(max_length=50, unique=True)
    nome = models.CharField(max_length=100, default="Sem Nome")


    deve_pagar = models.BooleanField(default=False)
    bloqueado = models.BooleanField(default=False)

    tipo = models.IntegerField(choices=Tipo.choices, default=Tipo.ALUNO)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "prontuario"
    REQUIRED_FIELDS = ["nome"]

    objects = UsuarioManager()

    def __str__(self):
        return f"{self.nome} ({self.prontuario})"
