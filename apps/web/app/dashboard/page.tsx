import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type UsuarioActual = {
  usuario: string;
  rol: string;
  empresa: string;
};

const ROL_LABEL: Record<string, string> = {
  admin: "Administrador",
  seller: "Vendedor",
};

async function getUsuarioActual(): Promise<UsuarioActual> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("No se pudo obtener el usuario actual");
  }

  return res.json();
}

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

export default async function DashboardPage() {
  const { usuario, rol, empresa } = await getUsuarioActual();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="border-b bg-background px-6 py-4">
        <span className="text-lg font-bold">CotizAPP</span>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-sm -translate-y-[20%]">
          <CardHeader className="items-center text-center">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold">
                {iniciales(usuario)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-2 text-xl">{usuario}</CardTitle>
            <Badge variant="secondary">{ROL_LABEL[rol] ?? rol}</Badge>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Empresa</span>
              <span className="font-medium">{empresa}</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
