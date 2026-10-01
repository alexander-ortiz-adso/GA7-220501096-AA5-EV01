const express = require("express");

const app = express();

// Permite recibir información en formato JSON
app.use(express.json());

/*
 Tecnologo en Analisis y Desarrollo de Software
 GA7-220501096-AA5-EV02
 Jose Alexander Ortiz Rubio
 */

const usuarios = [];

// ============================
// RUTA PRINCIPAL
// ============================

app.get("/", (req, res) => {
    res.send("API de autenticación funcionando correctamente");
});

// ============================
// SERVICIO DE REGISTRO
// ============================

app.post("/api/autenticar/registro", (req, res) => {

    // Obtener usuario y contraseña enviados
    const { usuario, password } = req.body;

    // Validar que los datos sean obligatorios
    if (!usuario || !password) {
        return res.status(400).json({
            error: "¡Atención! El usuario y la contraseña son obligatorios"
        });
    }

    // Verificar si el usuario ya existe
    const usuarioExiste = usuarios.find(
        u => u.usuario === usuario
    );

    if (usuarioExiste) {
        return res.status(409).json({
            error: "Usuario ya registrado"
        });
    }

    // Registrar el nuevo usuario
    usuarios.push({
        usuario: usuario,
        password: password
    });

    // Respuesta del servicio
    res.status(201).json({
        mensaje: "Usuario registrado exitosamente"
    });
});

// ==============================
// SERVICIO PARA LISTAR USUARIOS
// ==============================

app.get("/api/consulta/usuarios", (req, res) => {

    // Devolver la lista de usuarios registrados
    res.status(200).json(usuarios);
});

// =================================
// SERVICIO PARA ELIMINAR UN USUARIO
// =================================

app.delete("/api/autenticar/usuarios/:usuario", (req, res) => {

    // Obtener el nombre de usuario enviado en la URL
    const usuario = req.params.usuario;

    // Buscar la posición del usuario en el arreglo
    const indice = usuarios.findIndex(
        u => u.usuario === usuario
    );

    if (indice === -1) {
        return res.status(404).json({
            error: "El usuario no existe"
        });
    }

    // Eliminar el usuario del arreglo
    usuarios.splice(indice, 1);

    // Informar que la eliminación fue exitosa
    res.status(200).json({
        mensaje: "El usuario ha sido eliminado correctamente"
    });
});

// ELIMINAR TODOS LOS USUARIOS

app.delete("/api/autenticar/usuarios", (req, res) => {

    // Eliminar todos los usuarios
    usuarios.length = 0;

    res.status(200).json({
        mensaje: "Todos los usuarios han sido eliminados correctamente"
    });
});

// ==============================
// SERVICIO DE INICIO DE SESIÓN
// ==============================

app.post("/api/autenticar/login", (req, res) => {

    // Obtener las credenciales enviadas
    const { usuario, password } = req.body;

    // Validar que los datos sean obligatorios
    if (!usuario || !password) {
        return res.status(400).json({
            error: "El usuario y la contraseña son obligatorios"
        });
    }

    // Buscar usuario y comprobar la contraseña
    const usuarioEncontrado = usuarios.find(
        u => u.usuario === usuario &&
             u.password === password
    );

    // Si las credenciales son incorrectas
    if (!usuarioEncontrado) {
        return res.status(401).json({
            error: "Error en autenticación"
        });
    }

    // Si las credenciales son correctas
    res.status(200).json({
        mensaje: "Autenticación satisfactoria"
    });
});

// ============================
// INICIAR SERVIDOR
// ============================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});