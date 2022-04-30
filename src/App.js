import 'regenerator-runtime/runtime'
import React from 'react'
import './global.css'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar'

import Task1 from './components/Task1'
import Task2 from './components/Task2'
import getConfig from './config'
const { networkId } = getConfig("development");
import WellcomePage from './pages/WellcomePage'
import { CHALLENGE_ONE, CHALLENGE_TWO, COMPLETED } from './routes/consts'
import Completed from './pages/Completed'

export default function App() {

  if (!window.walletConnection.isSignedIn()) {
    return (
      <WellcomePage />
    )
  }

  return (
    <BrowserRouter>
        <NavBar/>
      <Routes>
        <Route path={CHALLENGE_ONE} element={<Task1/>}/>
        <Route path={CHALLENGE_TWO} element={<Task2/>}/>
        <Route path={COMPLETED} element={<Completed/>}/>
        <Route path='*' element={<Navigate replace to={CHALLENGE_ONE} />} />
      </Routes>
    </BrowserRouter>
  )
}

