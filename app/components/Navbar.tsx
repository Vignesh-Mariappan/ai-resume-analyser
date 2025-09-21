import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to="/">
            <p className='text-1xl uppercase font-bold text-gradient'>Resumind</p>
        </Link>
        <Link to="/" className='primary-button w-fit'>Upload Resume</Link>
    </nav>
  )
}

export default Navbar
