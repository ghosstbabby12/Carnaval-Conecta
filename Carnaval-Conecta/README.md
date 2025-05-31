
---

# 🚀 Guía de Configuración del Proyecto

## 🖥️ Backend - Spring Boot

### ✅ Requisitos

* Java 21 ☕
* Maven 4.0.0 📦
* Spring Boot 3.5.0 🌱

### 📂 Ruta del proyecto:

```
carnaval-backend/
```

### 🛠️ Pasos para ejecutar:

```bash
# 1. Entrar al directorio del backend
cd carnaval-backend

# 2. Limpiar y descargar dependencias
mvn clean install

# 3. Ejecutar la aplicación
mvn spring-boot:run
```

---

## 🌐 Frontend - React + Node.js

### ✅ Requisitos

* Node.js 18+ 🟢

### 📂 Ruta del proyecto:

```
carnaval-frontend/
```

### 🛠️ Pasos para ejecutar:

```bash
# 1. Entrar al directorio del frontend
cd carnaval-frontend

# 2. Instalar las dependencias
npm install

# 3. Ejecutar la aplicación
npm run dev
```

---
## 🐬 Importar la Base de Datos MySQL

Para ejecutar el proyecto en otro computador, necesitas importar la base de datos.

### 📌 Requisitos:

- MySQL (recomendado MySQL 8)
- MySQL Workbench

### ✅ Pasos:

1. Abrir **MySQL Workbench**
2. Ir al menú: `Server > Data Import`
3. Seleccionar:
   - 🔘 `Import from Self-Contained File`
   - 📂 Buscar el archivo: `database/carnaval_chatbot.sql`
4. En `Default Target Schema`, escribe: `carnival_chatbot`
   - O cambia el nombre si lo deseas, pero recuerda actualizarlo en `application.properties`.
5. Marcar ✅ `Create Schema if it does not exist`
6. Clic en **Start Import**

---

### ⚙️ Configurar la Conexión a la Base de Datos

Abre el archivo:

Y asegúrate de configurar correctamente tu conexión:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/carnival_chatbot?useSSL=false&serverTimezone=UTC
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA

