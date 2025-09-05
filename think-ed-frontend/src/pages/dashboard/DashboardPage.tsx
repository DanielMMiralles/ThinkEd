"use client"

import DashboardLayout from "../../components/layout/DashboardLayout"
import { FaBook, FaClock, FaTrophy, FaChartLine, FaCalendarAlt, FaPlay, FaArrowRight, FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"

const Dashboard = () => {
  // Mock data
  const stats = {
    completedCourses: 5,
    totalProgress: 75,
    studyHours: 120,
    streak: 7,
  }

  const recentCourses = [
    {
      id: 1,
      title: "Introducción a React",
      progress: 85,
      nextLesson: "Hooks Avanzados",
      thumbnail: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      title: "JavaScript Moderno",
      progress: 60,
      nextLesson: "Async/Await",
      thumbnail: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      title: "Diseño UX/UI",
      progress: 40,
      nextLesson: "Principios de Diseño",
      thumbnail: "/placeholder.svg?height=60&width=60",
    },
  ]

  const upcomingClasses = [
    {
      id: 1,
      title: "Sesión de React Hooks",
      time: "14:00",
      date: "Hoy",
      instructor: "Ana García",
    },
    {
      id: 2,
      title: "Workshop de JavaScript",
      time: "16:30",
      date: "Mañana",
      instructor: "Carlos López",
    },
  ]

  const achievements = [
    { id: 1, title: "Primer Curso Completado", icon: FaTrophy, earned: true },
    { id: 2, title: "Racha de 7 días", icon: FaChartLine, earned: true },
    { id: 3, title: "5 Cursos Completados", icon: FaStar, earned: true },
    { id: 4, title: "100 Horas de Estudio", icon: FaClock, earned: false },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">¡Hola!</h1>
            <p className="text-muted-foreground mt-1">
              Continúa tu viaje de aprendizaje. Tienes {recentCourses.length} cursos en progreso.
            </p>
          </div>
          <Link
            to="/todos-los-cursos"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explorar Cursos
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cursos Completados</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stats.completedCourses}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FaBook className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Progreso General</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stats.totalProgress}%</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <FaChartLine className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.totalProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Horas de Estudio</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stats.studyHours}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaClock className="w-6 h-6 text-blue-300" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Racha Actual</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stats.streak} días</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaTrophy className="w-6 h-6 text-orange-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Continuar Aprendiendo</h2>
              <Link to="/mis-cursos" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Ver todos
              </Link>
            </div>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">Siguiente: {course.nextLesson}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progreso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <FaPlay className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Upcoming Classes */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaCalendarAlt className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Próximas Clases</h2>
              </div>
              <div className="space-y-3">
                {upcomingClasses.map((class_) => (
                  <div key={class_.id} className="p-3 rounded-lg border border-border">
                    <h3 className="font-medium text-foreground text-sm">{class_.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {class_.date} a las {class_.time}
                    </p>
                    <p className="text-xs text-muted-foreground">Con {class_.instructor}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/clases-y-calendario"
                className="block mt-4 text-center text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Ver calendario completo
              </Link>
            </div>

            {/* Achievements */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Logros Recientes</h2>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        achievement.earned ? "bg-primary/10" : "bg-muted/50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-sm ${
                          achievement.earned ? "text-foreground font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {achievement.title}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
