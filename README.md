# Juega-UNLAM — Guía rápida de base de datos (Prisma + MySQL)

Este README explica de forma sencilla y práctica cómo crear y usar la base de datos del proyecto con Prisma y MySQL para que todo el equipo pueda replicar el entorno y trabajar con el schema.

## Resumen (qué hace cada herramienta)
- Prisma (schema.prisma): define tus modelos y relaciones.
- `npx prisma db push`: aplica el schema a la base de datos (crea/ajusta tablas). No crea historial de migraciones.
- `npx prisma migrate dev`: crea archivos de migración (historial) y aplica cambios a la DB. Recomendado para desarrollo en equipo.
- `npx prisma generate`: genera el Prisma Client (código TypeScript/JS tipado) a partir del `schema.prisma`.
- `npx prisma studio`: interfaz web para ver/editar datos en la DB.

---

## Requisitos previos
- Node.js + npm instalados
- MySQL corriendo (cliente `mysql` accesible desde PowerShell o usar MySQL Workbench)
- Variables de entorno (`.env`) con `DATABASE_URL` configurada

Ruta del proyecto (ejemplo local):
`c:\Users\Pc\Downloads\BACKEND JUEGA-UNLAM\Juega-UNLAM`

---

## 1) Configurar `DATABASE_URL`
Crea/edita el archivo `.env` en la raíz del proyecto y ajusta la URL a tu usuario, contraseña, host, puerto y nombre de BD:

```powershell
# .env
DATABASE_URL="mysql://root:TU_PASS@localhost:3306/juega_unlam"
```

> Nota: Prisma no crea la base de datos por ti. Si la base de datos no existe, crea el DB en MySQL primero (paso 2).

---

## 2) Crear la base de datos en MySQL
Desde PowerShell (te pedirá la contraseña si corresponde):

```powershell
# Crear DB con collation utf8mb4
mysql -u root -p -e "CREATE DATABASE juega_unlam CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Si tu `mysql.exe` está en una ruta diferente en Windows, usa la ruta completa:

```powershell
& 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u root -p -e "CREATE DATABASE juega_unlam CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

---

## 3) Aplicar el schema a la base de datos
Tienes dos opciones dependiendo de si querés historial de migraciones o no.

Opción A — (rápida) `db push` — aplica schema inmediatamente sin crear migraciones

```powershell
cd "c:\Users\Pc\Downloads\BACKEND JUEGA-UNLAM\Juega-UNLAM"
npx prisma db push
npx prisma generate
```

Opción B — (recomendada para desarrollo en equipo) `migrate dev` — crea migraciones y aplica

```powershell
cd "c:\Users\Pc\Downloads\BACKEND JUEGA-UNLAM\Juega-UNLAM"
npx prisma migrate dev --name init
# este comando suele ejecutar prisma generate automáticamente, pero puedes forzarlo después
npx prisma generate
```

Explicación rápida:
- `migrate dev` deja un historial en `prisma/migrations` que el equipo puede versionar. Útil si más personas trabajan en la BD.
- `db push` es rápido para prototipos, pero no deja historial.

---

## 4) Generar el Prisma Client (qué significa y por qué es importante)

`npx prisma generate` leerá tu `prisma/schema.prisma` y generará el paquete `@prisma/client` en `node_modules` con:
- Un objeto `PrismaClient` que exporta `prisma.<modelo>` (por ejemplo `prisma.juego`).
- Métodos tipados (`findUnique`, `findMany`, `create`, `update`, etc.).
- Tipos TypeScript para modelos y resultados de consulta (autocompletado en VS Code).

Siempre ejecutar `prisma generate` después de cambiar `schema.prisma` para que el cliente refleje los cambios en los modelos y tipos.

```powershell
npx prisma generate
```

---

## 5) Verificar que las tablas se crearon
Con MySQL CLI:

```powershell
mysql -u root -p -e "USE juega_unlam; SHOW TABLES;"
```

O con Prisma Studio (interfaz web):

```powershell
npx prisma studio
```

---

## 6) Ejemplos prácticos (TypeScript) — usar Prisma Client
Importar y usar el cliente en tu código TS/JS:

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function ejemplo() {
  const juego = await prisma.juego.findUnique({
    where: { id: 1 },
    include: {
      imagenes: true,
      juego_generos: { include: { genero: true } }
    }
  })
  console.log(juego)
}

ejemplo()
```

Crear un juego y asociarle géneros (usa la tabla intermedia `Juego_Genero`):

```ts
const nuevo = await prisma.juego.create({
  data: {
    nombre: 'Mi Juego',
    precio: 19.99,
    descripcion: '...',
    desarrolladorId: 1,
    juego_generos: {
      create: [
        { genero: { connect: { id: 2 } }, detalle: 'Principal' },
        { genero: { connect: { id: 3 } }, detalle: 'Secundario' }
      ]
    }
  },
  include: { juego_generos: { include: { genero: true } } }
})
```

---

## 7) Buenas prácticas y recomendaciones
- Usar `migrate dev` para desarrollo colaborativo (permite versionar migraciones en Git).
- Mantener `.env` fuera del repositorio (no subir credenciales).
- No guardar binarios (imágenes) en la DB; subir a storage (S3, Cloud) y guardar URLs en `Imagen.url`.
- Para marcar la imagen "principal" recomiendo mantener `mainImagenId` en `Juego` y/o `isMain` en `Imagen` y sincronizar con una transacción.
- Si añadís campos a la relación (por ejemplo `detalle` en `Juego_Genero`) usar una tabla intermedia explícita (como ya está en el schema).

---

## 8) Problemas comunes y soluciones
- Error: "Could not find Prisma Schema": Asegurate de estar en la carpeta del proyecto donde existe `prisma/schema.prisma` antes de ejecutar los comandos.
- Error: Conexión rechazada: revisá `DATABASE_URL` y que MySQL esté corriendo.
- Cambios en `schema.prisma` pero sin actualizar el cliente: ejecutar `npx prisma generate`.

---

## 9) Flujo sugerido para un cambio en el schema (equipos)
1. Modificar `prisma/schema.prisma`.
2. Ejecutar `npx prisma migrate dev --name descripcion_cambio`.
3. Confirmar que la migración se aplicó y `npx prisma generate` (si no se ejecutó automáticamente).
4. Push de los cambios a Git (incluyendo `prisma/migrations`).

---

Si querés, puedo añadir:
- Un pequeño script en `package.json` para simplificar comandos (`npm run db:push`, `npm run migrate`, etc.).
- Ejemplos de endpoints CRUD en `src/controllers`/`services` que usen `Juego_Genero`.

---

Espero que este README ayude a tu equipo a entender y usar la base de datos del proyecto. Si querés, lo ajusto con la información específica del entorno (usuario MySQL, scripts de npm, o pasos para CI/CD).