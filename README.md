
# 🚀 Sistema de Manejo de Tareas Kanban

Bienvenido a nuestro **Sistema de Manejo de Tareas** tipo Kanban. Este software permite a los usuarios organizar sus tareas de manera eficiente, utilizando una interfaz intuitiva con funcionalidades de **drag and drop**.

## 📦 Requisitos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Angular CLI](https://angular.io/cli) (versión 12 o superior)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

## ⚙️ Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar el sistema en tu máquina local:

### 1. Clona el repositorio

```bash
git clone https://github.com/cdberrio5/Angular-prueba.git
cd Angular-prueba
```

### 2. Construcción del Frontend

1. Navega al directorio del frontend:

    ```bash
    cd front/app
    ```

2. Instala las dependencias de Node.js:

    ```bash
    npm i
    ```

3. Construye la aplicación de Angular:

    ```bash
    ng build
    ```

### 3. Construcción del Backend

1. Regresa al directorio raíz:

    ```bash
    cd ..
    ```

2. Navega al directorio del API:

    ```bash
    cd api
    ```

3. Instala las dependencias de Node.js:

    ```bash
    npm i
    ```

4. Regresa al directorio raíz:

    ```bash
    cd ..
    ```

### 4. Iniciar el Servicio

1. Usa Docker Compose para construir y ejecutar los contenedores:

    ```bash
    docker-compose up -d --build
    ```

## 📊 Funcionalidades

- **Interfaz Intuitiva**: Organiza tus tareas visualmente con facilidad.
- **Drag and Drop**: Mueve tus tareas entre columnas con un simple arrastre.
- **Filtrado y Búsqueda**: Encuentra rápidamente tus tareas según diferentes criterios.

## 📞 Información de Contacto

Si tienes preguntas, sugerencias o necesitas ayuda, no dudes en contactarme:

- 📧 **Email**: [cristianberrio9864@gmail.com](mailto:cristianberrio9864@gmail.com)
- 📱 **Celular / WhatsApp**: [301 323 1465](https://wa.me/3013231465)

---

¡Gracias por usar nuestro sistema de manejo de tareas Kanban! Si tienes alguna pregunta o sugerencia, no dudes en abrir un *issue* en este repositorio. ¡Feliz organización! 🎉
