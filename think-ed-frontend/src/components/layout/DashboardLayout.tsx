// src/components/layout/DashboardLayout.tsx
import type React from "react"
import type { ReactNode } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
