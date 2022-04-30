import React from 'react'
import bye from '../assets/bye.png'
import { logout } from '../utils'

const Completed = () => {
  return (
    <div>
        <h1>
            <img height={200} width={200} src={bye}/>
        </h1>
        <div style={{textAlign: 'center'}}>
            <h1>Congrats!</h1>
            <p >Now you are ready to tell others how to make our world a better place by recycling</p>
            <button onClick={logout} style={{backgroundColor: 'crimson', marginTop: '2rem'}}>Sign out</button>
        </div>
    </div>
  )
}

export default Completed