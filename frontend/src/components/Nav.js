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
            <NavLink to={`/`} exact activeClassName='active' className="nav-link">
              Home
            </NavLink>
          </li>
          <li className='nav-item dropdown'>
            <NavLink 
              className="nav-link dropdown-toggle" 
              href="#" 
              id="navbarDropdown" 
              role="button" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false"
              activeClassName='active'
              >
              Categories
            </NavLink>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              {props.categories.map((category) => (
                <NavLink to={`/categories`} activeClassName='active' className="dropdown-item">
                  {category.name}
                </NavLink>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}