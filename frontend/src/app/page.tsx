import { Dashboard } from "../components/dashboard";
import { useState } from "react"
import { Login } from "../components/login"
export default function Page() {
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [userName, setUserName] = useState("")

const handleLogin = (name: string) => {
    setUserName(name)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
  }

   return isLoggedIn ? <Dashboard userName={userName} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />
}
