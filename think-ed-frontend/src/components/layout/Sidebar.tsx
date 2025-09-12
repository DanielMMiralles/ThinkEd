import {
  IoBookOutline,
  IoChatbubblesOutline,
  IoSettingsOutline,
  IoHomeOutline,
  IoLibraryOutline,
} from "react-icons/io5"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    {
      path: "/dashboard",
      icon: IoHomeOutline,
      label: "Dashboard",
      description: "Resumen general",
    },
    {
      path: "/my-courses",
      icon: IoBookOutline,
      label: "Mis Cursos",
      description: "Cursos inscritos",
    },
    {
      path: "/courses",
      icon: IoLibraryOutline,
      label: "Explorar Cursos",
      description: "Catálogo completo",
    },
    {
      path: "/lessons-and-calendar",
      icon: IoChatbubblesOutline,
      label: "Clases en Vivo",
      description: "Calendario y sesiones",
    },
    {
      path: "/recursos",
      icon: IoBookOutline,
      label: "Recursos",
      description: "Material de apoyo",
    },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <aside
      className={`${isCollapsed ? "w-16" : "w-64"} bg-sidebar border-r border-sidebar-border min-h-screen flex flex-col transition-all duration-300`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className={`${isCollapsed ? "w-0 h-0" : "w-20 h-15"} bg-sidebar-accent/10 p-2 border-primary border-2 rounded-lg flex items-center justify-center`}>
            <img src="\src\assets\think-ed.png" alt="Think-ed" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-m font-bold text-sidebar-foreground">Think-ed</h1>
              <p className="text-xs text-muted-foreground">Plataforma Educativa</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
                  ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`
                    ${active ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-primary"}
                    transition-colors duration-200
                  `}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                  </div>
                )}
                {!isCollapsed && active && <div className="w-2 h-2 bg-sidebar-primary rounded-full"></div>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Settings Section */}
      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="/settings"
          className={`
            flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
            ${
              isActive("/settings")
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            }
          `}
        >
          <IoSettingsOutline
            size={20}
            className={`
              ${isActive("/settings") ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-primary"}
              transition-colors duration-200
            `}
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">Configuración</div>
              <div className="text-xs text-muted-foreground">Ajustes y preferencias</div>
            </div>
          )}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full mt-4 px-3 py-2 text-xs text-muted-foreground hover:text-sidebar-foreground transition-colors rounded-lg hover:bg-sidebar-accent/30"
        >
          {isCollapsed ? "→" : "←"} {!isCollapsed && "Contraer"}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
