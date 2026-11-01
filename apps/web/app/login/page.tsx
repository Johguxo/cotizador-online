"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Todavía no hay autenticación real: cualquier envío te lleva al dashboard.
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">CotizAPP</CardTitle>
          <CardDescription>Ingresa a tu cuenta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input id="email" type="email" placeholder="tu@empresa.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" className="mt-2 w-full">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
