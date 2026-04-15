import { Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Welcome from './components/Accueil'
import History from './components/Historique'
import Activities from './components/Activites'
import GetInvolved from './components/Implication'
import Footer from './components/Footer'
import ReservationsPage from './pages/ReservationsPage'

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Welcome />
        <History />
        <Activities />
        <GetInvolved />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
      </Routes>
    </LangProvider>
  )
}
