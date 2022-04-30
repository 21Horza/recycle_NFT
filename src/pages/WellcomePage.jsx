import React from 'react'
import { login } from '../utils'

const WellcomePage = () => {
  return (
    <div style={{textAlign: 'center', marginTop: '5rem'}}>
        <img height={200} width={200} src={require('./../assets/greeting.PNG')}/>
        <h2>Make the world a better place with NEAR!</h2>
          <button onClick={login} style={{marginTop: '2rem'}}>Sign in</button>
    </div>
  )
}

export default WellcomePage