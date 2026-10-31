from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}


class UsuarioActual(BaseModel):
    usuario: str
    rol: str
    empresa: str


@app.get("/me", response_model=UsuarioActual)
def usuario_actual():
    return UsuarioActual(
        usuario="Jair Moreno",
        rol="admin",
        empresa="Cotizador Demo S.A.C.",
    )
