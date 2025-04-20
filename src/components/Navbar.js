import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ search, setSearch }) => {
  return (
    <nav className="navbar">
      <h2>💰 Crypto Tracker</h2>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="#">News</Link> {/* Can link to a news page later */}
      </div>
    </nav>
  )
}

export default Navbar;
