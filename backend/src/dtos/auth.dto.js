const { z } = require("zod");

// RF-001: nombre, correo, contraseña y aceptación de políticas son mínimos.
// aceptaPoliticas es un requisito de validación del request — no se persiste
// en DB (el modelo Usuario no tiene esa columna).
const registerSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es requerido"),
  correo: z.string().trim().email("Formato de correo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  aceptaPoliticas: z.literal(true, "Debe aceptar las políticas para continuar"),
});

const loginSchema = z.object({
  correo: z.string().trim().email("Formato de correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

const recuperarPasswordSchema = z.object({
  correo: z.string().trim().email("Formato de correo inválido"),
});

const restablecerPasswordSchema = z.object({
  token: z.string().min(1, "El token es requerido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

module.exports = {
  registerSchema,
  loginSchema,
  recuperarPasswordSchema,
  restablecerPasswordSchema,
};
