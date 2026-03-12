import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ServicesPage } from './pages/ServicesPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import { TechnologiesPage } from './pages/TechnologiesPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { TeamPage } from './pages/TeamPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { AuthProvider } from './contexts/AuthContext'
import { AuthGuard } from './components/admin/AuthGuard'
import { AdminLayout } from './pages/admin/AdminLayout'
import { LoginPage } from './pages/admin/LoginPage'
import { DashboardPage } from './pages/admin/DashboardPage'
import { ProjectsPage as AdminProjectsPage } from './pages/admin/ProjectsPage'
import { BlogPage as AdminBlogPage } from './pages/admin/BlogPage'
import { MessagesPage } from './pages/admin/MessagesPage'
import { TeamPage as AdminTeamPage } from './pages/admin/TeamPage'
import { SettingsPage } from './pages/admin/SettingsPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <AdminLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="team" element={<AdminTeamPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/:locale" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:id" element={<ServiceDetailPage />} />
          <Route path="technologies" element={<TechnologiesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
