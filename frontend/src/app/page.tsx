import { Dashboard } from "../components/dashboard";
import { useState } from "react"
import { Login } from "../components/login"
export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")

  const handleLogin = (user: any) => {
    setUserName(user.nombre_completo || user.username)

    // Robustez: Si el backend no devuelve nombre_rol (por caché o falta de reinicio), usamos id_rol
    let role = user.nombre_rol;
    if (!role) {
      if (user.id_rol === 1) role = 'administrador';
      else if (user.id_rol === 2) role = 'supervisor';
      else role = 'operador';
    }

    console.log("User Role detected:", role); // Debug
    setUserRole(role || "Operador")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setUserRole("")
  }

  return isLoggedIn ? <Dashboard userName={userName} userRole={userRole} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />
}
