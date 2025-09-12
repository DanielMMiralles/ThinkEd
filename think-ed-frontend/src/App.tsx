// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/dashboard/DashboardPage';
import MyCoursesPage from './pages/myCourses/MyCoursesPage';
import ExploreCoursesPage from './pages/exploreCourses/ExploreCoursesPage';
import CalendarPage from './pages/calendar/CalendarPage';
import CourseDetailPage from './pages/courseDetails/CourseDetailPage';
const App = () => {
  const { token, role } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          token ? (
            role === "estudiante" ? (
              <Dashboard />
            ) : role === "instructor" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/my-courses"
        element={
          token && role === "estudiante" ? (
            <MyCoursesPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/courses"
        element={
          token && role === "estudiante" ? (
            <ExploreCoursesPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/lessons-and-calendar"
        element={
          token ? (
            role === "estudiante" ? (
              <CalendarPage />
            ) : role === "instructor" ? (
              <CalendarPage />
            ) : (
              <Navigate to="/login" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/courses/:courseId/module" element={<CourseDetailPage />} />
    </Routes>
  );
};

export default App;