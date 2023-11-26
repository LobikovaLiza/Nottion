import { useContext, useState } from 'react'
import { User } from '../util/validation'
import { z } from "zod";
import { UserContext } from '../components/UserContextProvier';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)
  const [error1, setError1] = useState(null)

  const userContext = useContext(UserContext)
  console.log(userContext)
  const navigate = useNavigate()

  function handleLogin(){
    
    try {
      const user = User.parse({
        email,
        password,
        date: Date.now()
      })
      setErrors(null)
    } catch (error) {
      if(error instanceof z.ZodError){
        setErrors(error?.format())
      }
    }
    
   
    if(errors === null){
    
    const query = new URLSearchParams({
      email,
      password
    }).toString()

    fetch(`http://localhost:5001/Users?${query}`)
      .then((r) => r.json())
      .then((Users)=>Users[0])
      .then((User)=>{
        if(User){
          userContext.onChange(User)
          navigate('/')
        } else {
          setError1('Invalid user')
        }
      })
      

    }
  }

  function handleSignUp(){
    navigate('/signup')
  }

  return (
    
    <div  className="prose flex flex-col mx-auto">
      
      <h1 className="mx-auto">Log In</h1>

      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className='mt-4'/>
      {errors?.email && <div className="text-red-400">{errors?.email?._errors}</div>}

      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='mt-4'/>
      {errors?.password && <div className="text-red-400">{errors?.password?._errors}</div>}

      {error1 && <div className="text-red-400">{error1}</div>}
      
      <button onClick={handleLogin} className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-2xl">Log In</button>
      <button onClick={handleSignUp} className='mb-10'>Sign Up</button>
    </div>
   
  )
}

