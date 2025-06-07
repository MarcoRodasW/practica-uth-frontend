
# Guía de Instalación y Ejecución de un Proyecto React desde GitHub

  

## 1. Clonar el Repositorio de GitHub

  

Primero, necesitas clonar el repositorio del proyecto en tu máquina local. Abre tu terminal o línea de comandos y ejecuta el siguiente comando, reemplazando `[URL_DEL_REPOSITORIO]` con la URL real del repositorio de GitHub:

  

```bash

git clone [URL_DEL_REPOSITORIO]

```

  

Por ejemplo:

  

```bash

git clone https://github.com/tu-usuario/nombre-de-tu-proyecto.git

```

  

Una vez clonado, navega al directorio del proyecto:

  

```bash

cd nombre-de-tu-proyecto

```

  

## 2. Crear el Archivo `.env`

  

Muchos proyectos de React utilizan variables de entorno para configurar API keys, URLs de servicios o ajustes específicos del entorno. Estas variables suelen almacenarse en un archivo llamado `.env` en la raíz del proyecto.

  

1. **Verifica si hay un archivo de ejemplo (`.env.example` o similar):** Es común que los proyectos incluyan un archivo de ejemplo para las variables de entorno. Busca un archivo como ``.env.example``, ``.env.development.example``, o ``.env.production.example`` en la raíz de tu proyecto.

  

2. **Copia el archivo de ejemplo (o crea uno nuevo):**

* Si encuentras un archivo de ejemplo (por ejemplo, `.env.example`), cópialo y renómbralo a `.env`:

  

```bash

cp .env.example .env

```

  

* Si no hay un archivo de ejemplo, crea un nuevo archivo llamado `.env` en la raíz de tu proyecto:

  

```bash

touch .env

```

  

3. **Edita el archivo `.env`:** Abre el archivo `.env` con tu editor de texto favorito y rellena los valores necesarios para las variables de entorno. Por ejemplo:

  

```env

VITE_API_URL= URL DE LA API

```

  

## 3. Instalar PNPM (si no lo tienes)

  

`pnpm` es un gestor de paquetes alternativo a `npm` o `yarn` que es más eficiente en el uso del espacio en disco y la velocidad de instalación. Si no lo tienes instalado globalmente, puedes hacerlo con `npm`:

  

```bash

npm install -g pnpm

```

  

## 4. Instalar las Dependencias del Proyecto con PNPM

  

Una vez que tengas `pnpm` instalado y estés en el directorio raíz del proyecto, puedes instalar todas las dependencias del proyecto ejecutando:

  

```bash

pnpm install

```

  

Este comando leerá el archivo `package.json` y descargará todas las librerías y paquetes necesarios.

  

## 5. Ejecutar el Proyecto

  

Finalmente, puedes iniciar el servidor de desarrollo de React. Los proyectos de React suelen tener un script definido en `package.json` para iniciar el proyecto, comúnmente llamado `start` o `dev`.

  

Ejecuta el siguiente comando para iniciar el proyecto:

  

```bash

pnpm start

```

  

O, si el script se llama `dev`:

  

```bash

pnpm dev

```

  

Después de ejecutar este comando, el proyecto debería abrirse automáticamente en tu navegador predeterminado (generalmente en `http://localhost:3000`). Si no lo hace, abre esa URL manualmente en tu navegador.

  

# Tecnologias Usadas

 - Framework: React + TypeScript
 - Libreria de Estilos: TalwindCSS + ShadCN
 - Librerias usadas: Axios + TanstackQuery
 - Drag & Drop: DnD Kit
