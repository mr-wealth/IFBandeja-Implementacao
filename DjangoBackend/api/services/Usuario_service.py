from api.models.Usuario import Usuario

class UsuarioService:

    @staticmethod
    def listar_todos():
        return Usuario.objects.all()

    @staticmethod
    def buscar_por_id(usuario_id):
        return Usuario.objects.get(id=usuario_id)

    @staticmethod
    def criar_usuario(data):
        return Usuario.objects.create_user(
            prontuario=data["prontuario"],
            senha=data["senha"],
            nome=data["nome"],
            tipo=data.get("tipo")
        )

    @staticmethod
    def atualizar_usuario(usuario, data):
        for campo, valor in data.items():
            if campo == "senha":
                usuario.set_password(valor)
            else:
                setattr(usuario, campo, valor)
        usuario.save()
        return usuario

    @staticmethod
    def deletar_usuario(usuario):
        usuario.delete()
