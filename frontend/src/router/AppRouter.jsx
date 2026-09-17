import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import RestablecerPassword from "../pages/auth/RestablecerPassword";
import Direcciones from "../pages/customer/Direcciones";
import RoleGuard from "../components/auth/RoleGuard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar-password" element={<ForgotPassword />} />
      <Route
        path="/restablecer-password/:token"
        element={<RestablecerPassword />}
      />
      <Route
        path="/direcciones"
        element={
          <RoleGuard roles={["cliente"]}>
            <Direcciones />
          </RoleGuard>
        }
      />
      {/* Rondas de admin/vendedor (RF-006 rutas /admin/* y /vendedor/*)
          quedan pendientes para Ronda 3, cuando existan las páginas de
          Sellers, Users, Roles y el panel de vendedor. */}
    </Routes>
  );
}

export default AppRoutes;
