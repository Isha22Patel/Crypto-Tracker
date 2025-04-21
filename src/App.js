import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import CoinDetails from './components/pages/CoinDetails'
import Contact from './components/pages/Contact'
import News from './components/pages/News'

function App() {
  const [search, setSearch] = useState('')

  return (
    <Router>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/News' element={<News/>}/>
      </Routes>
    </Router>
  )
}

export default App
