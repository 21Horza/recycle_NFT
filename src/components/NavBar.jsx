import React from 'react'
import { logout } from '../utils'

const NavBar = () => {
  return (
    <>
    <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
        <h2 style={{fontSize: '1rem', color:'lightgreen'}}> Signed as: {window.accountId}!</h2>
    </>
  )
}

export default NavBar