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
import Triggers from './components/Triggers'
import GetSymptoms from './components/GetSymptoms'
import GetMedications from './components/GetMedications'
import GetTriggers from './components/GetTriggers'
import AddSymptom from './components/AddSymptom'
import EditSymptom from './components/EditSymptom'
import SymptomDetails from './components/SymptomDetails'
import Overview from './components/Overview'
import EditMedication from './components/EditMedication'
import AddTrigger from './components/AddTrigger'
import MedicationDetails from './components/MedicationDetails'
import AddMedication from './components/AddMedication'
import TriggerDetails from './components/TriggerDetails'
import EditTrigger from './components/EditTrigger'
import ProtectedRoute from './components/ProtectedRoute'
import GetInhalers from './components/GetInhalers';
import AddInhaler from './components/AddInhaler';
import RecordPuffs from './components/RecordPuffs';
import Features from './components/Features';
import Contact from './components/Contact';

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
      element: <Questionnaire />
    },

    {
      path: "/overview",
      element: <ProtectedRoute><Overview/></ProtectedRoute>
    },
    
    {
      path: "/symptoms",
      element: <ProtectedRoute><GetSymptoms/></ProtectedRoute>
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
      element: <ProtectedRoute><Dashboard/></ProtectedRoute>
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
      path: "/triggers/add",
      element: <AddTrigger />
    },

    {
      path: "/medications/:id",
      element: <MedicationDetails />
    },

    {
      path: "/addMedication",
      element: <AddMedication />
    },

    {
      path: "/editMedication/:id",
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

    {
      path: "/medications/add",
      element: <AddMedication />
    },

    {
      path: "/inhalers",
      element: <GetInhalers />
    },
    {
      path: "/addInhaler",
      element: <AddInhaler />
    },
    {
      path: "/inhalers/:id/record",
      element: <RecordPuffs />
    },

    {
      path: "/features",
      element: <Features />
    },

    {
      path: "/contact",
      element: <Contact />
    },

    

    

  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
