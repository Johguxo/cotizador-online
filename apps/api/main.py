from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


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
