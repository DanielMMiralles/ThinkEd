import { FaUserCircle, FaBell, FaChevronDown } from "react-icons/fa"
import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Bienvenido de vuelta a tu espacio de aprendizaje</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
            <FaBell size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-foreground font-medium hidden sm:block">Usuario</span>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <FaUserCircle size={20} className="text-primary-foreground" />
                </div>
                <FaChevronDown size={12} className="text-muted-foreground" />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                <a className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  Mi Perfil
                </a>
                <a className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  Configuración
                </a>
                <hr className="my-2 border-border" />
                <Link to="/login" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  Cerrar Sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
