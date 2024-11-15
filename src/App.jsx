import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Hero from './components/hero'
import PrivacySettings from './pages/privacySettings'
import SignUp from './pages/SignUpForm'
import SignIn from './pages/signInForm'
import Questionnaire from './pages/questionnaire'
import Dashboard from './assets/layout/DashBoard'
import SymptomsLog from './assets/layout/symptomlog'
import MedicationTracking from './assets/layout/medicationTracker'
import AsthmaTips from './components/AsthmaTipsAndResources'
import LoggingHistory from './assets/layout/LoggingHistory'
import Reminders from './assets/layout/Reminders'
import Triggers from './components/Triggers'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },

    {
      path: "/privacySettings",
      element: <PrivacySettings />
    },

    {
      path: "/signUp",
      element: <SignUp/>
    },
    {
      path: "/signIn",
      element: <SignIn/>
    },

    {
      path: "/questionnaire",
      element: <Questionnaire/>
    },

    {
      path: "/dashboard",
      element: <Dashboard/>
    },

    {
      path: "/symptomslog",
      element: <SymptomsLog/>
    },

  
    {
      path: "/medicationTracking",
      element: <MedicationTracking />
    },

    {
      path: "/Reminders",
      element: <Reminders />
    },

    {
      path: "/loggingHistory",
      element: <LoggingHistory />
    },
    
    {
      path: "/triggers",
      element: <Triggers />
    },

  ])



  return (
    <RouterProvider router={router}/>
  )
}

export default App
