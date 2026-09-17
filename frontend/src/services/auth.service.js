import axios from "axios";

export const AUTH_TOKEN_KEY = "trendy_token";
export const AUTH_LOGOUT_EVENT = "trendy:auth-logout";

const baseURL = import.meta.env.VITE_API_URL || "/api/v1";

const api = axios.create({ baseURL });

// Agrega el token guardado (si existe) a cada request saliente.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Ante cualquier 401 (token vencido, revocado o inválido) limpiamos la
// sesión local y avisamos al resto de la app vía un evento del navegador,
// para no crear un import circular entre el servicio y el AuthContext.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
    }

    return Promise.reject(error);
  },
);

function register(datos) {
  return api.post("/auth/register", datos).then((response) => response.data);
}

function login(datos) {
  return api.post("/auth/login", datos).then((response) => response.data);
}

function logout() {
  return api.post("/auth/logout").then((response) => response.data);
}

function recuperarPassword(correo) {
  return api
    .post("/auth/recuperar-password", { correo })
    .then((response) => response.data);
}

function restablecerPassword(token, password) {
  return api
    .post("/auth/restablecer-password", { token, password })
    .then((response) => response.data);
}

const authService = {
  register,
  login,
  logout,
  recuperarPassword,
  restablecerPassword,
};

export default authService;
