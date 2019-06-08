import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav (props) {
  console.log(props)
  return (
    <nav className='nav navbar navbar-expand-lg navbar-light bg-light'>
      <NavLink to={`/`} className='navbar-brand' >Readable Project</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className='collapse navbar-collapse' id="navbarNav">
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink to={`/`} exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to={`/categories`} activeClassName='active'>
              Categories
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}