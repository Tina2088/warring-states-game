import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { StartPage } from './components/StartPage'
import { GamePage } from './components/GamePage'
import { EndingPage } from './components/EndingPage'
import { GuidePage } from './components/GuidePage'
import { MetaProgressPage } from './components/MetaProgressPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/ending" element={<EndingPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/meta" element={<MetaProgressPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
