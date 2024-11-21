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
import SymptomLog from './assets/layout/symptomlog'
import MedicationTracker from './assets/layout/medicationTracker'
import AsthmaTips from './components/AsthmaTipsAndResources'
import LoggingHistory from './assets/layout/LoggingHistory'
import Reminders from './assets/layout/Reminders'
import Triggers from './components/Triggers'
import GetSymptoms from './components/GetSymptoms'
import GetMedications from './components/GetMedications'
import GetTriggers from './components/GetTriggers'
import AddSymptom from './components/AddSymptom'
import EditSymptom from './components/EditSymptom'
import SymptomDetails from './components/SymptomDetails'
import Overview from './components/Overview'
import AddMedication from './components/AddMedication'
import AddTrigger from './components/AddTrigger'
import MedicationDetails from './components/MedicationDetails'
import EditMedication from './components/EditMedication'
import TriggerDetails from './components/TriggerDetails'
import EditTrigger from './components/EditTrigger'



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
      path: "/login",
      element: <SignIn/>
    },

    {
      path: "/questionnaire",
      element: <Questionnaire/>
    },

    {
      path: "/overview",
      element: <Overview/>
    },
    {
      path: "/symptoms",
      element: <GetSymptoms/>
    },

    {
      path: "/medications",
      element: <GetMedications/>
    },
    // {
    //   path: "/triggers",
    //   element: <GetTriggers/>
    // },

    {
      path: "/dashboard",
      element: <Dashboard/>
    },

    // {
    //   path: "/symptomslog",
    //   element: <SymptomsLog/>
    // },

  
    // {
    //   path: "/medicationTracking",
    //   element: <MedicationTracking />
    // },

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
      element: <GetTriggers/>
    },

    {
      path: "/symptoms/add",
      element: <AddSymptom />
    },

    {
      path: "/symptoms/:id",
      element: <SymptomDetails />
    },

    {
      path: "/symptoms/:id/edit",
      element: <EditSymptom />
    },

    {
      path: "/medications/add",
      element: <AddMedication />
    },

    {
      path: "/triggers/add",
      element: <AddTrigger />
    },

    {
      path: "/medications/:id",
      element: <MedicationDetails />
    },

    {
      path: "/medications/:id/edit",
      element: <EditMedication />
    },

    {
      path: "/triggers/:id",
      element: <TriggerDetails />
    },

    {
      path: "/triggers/:id/edit",
      element: <EditTrigger />
    },


    

  ])



  return (
    <RouterProvider router={router}/>
  )
}

export default App
