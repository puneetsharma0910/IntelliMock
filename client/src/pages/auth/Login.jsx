import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'

const Login = ({setCurrentPage}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, seterror] = useState(null)
  const handleLogin = async (e) => {
     e.preventDefault()
  }
  
  return <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>
      <form onSubmit={handleLogin}>
        <Input 
        onChange={(e) => setEmail(e.target.value)}
        label="Email Address"
        value={email}
        placeholder="Enter your email"
        type="email" />
          <Input 
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        value={password}
        placeholder="Min 8 characters"
        type="password" />
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        <button 
        type='submit'
        className='btn-primary'>
          Login
        </button>
        <p className='text-[13px] text-slate-900 mt-4'>
          Don't have an account?{" "}
          <button 
          className='font-medium text-primary underline cursor-pointer'
          onClick={()=>{
          setCurrentPage("signup")
          }}>
            Sign up
          </button>
        </p>
       
      </form>
    </div>
    
  
}

export default Login
