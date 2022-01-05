import React,{useEffect} from 'react'
import { useAuthContext } from '../contexts/AuthContext'

const LogoutPage = () => {
  const {logout} =useAuthContext()

  useEffect(()=>{
    logout()
  })

  return (
    <div className ="center">
     <h2> Thank you ! You are logged out. </h2>
    </div>
  )
}

export default LogoutPage
