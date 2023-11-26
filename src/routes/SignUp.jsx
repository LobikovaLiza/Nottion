import { useState } from 'react'
import { User } from '../util/validation'
import { z } from "zod";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')
  const [errors, setErrors] = useState(null)
  const [errorUser, setErrorUser] = useState(false)

  const navigate = useNavigate()

  function handleSignUp(){
    
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
    
   
    if(errors === null && password === repassword){
    
    const query = new URLSearchParams({
      email,
      password
    }).toString()

    fetch(`http://localhost:5001/Users?${query}`)
      .then((r) => r.json())
      .then((Users)=>Users[0])
      .then((User)=>{
        if(User){
          setErrorUser(true)
        } else {
            const obj = {
                "id": Date.now(),
                "email": email,
                "password": password
              }
              fetch(`http://localhost:5001/Users`, { 
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj)
                      })
             .then((r) => r.json())
             navigate('/')
        }
      })
      

    }
  }

  function handleLogin(){
    navigate('/login')
  }

  return (
    
    <div className="prose flex flex-col mx-auto">
      
      <h1 className="mx-auto">Sign Up</h1>

      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className='mt-4'/>
      {errors?.email && <div className="text-red-400">{errors?.email?._errors}</div>}
      
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='mt-4'/>
      {errors?.password && <div className="text-red-400">{errors?.password?._errors}</div>}
      
      <input placeholder="repeat password" type="password" value={repassword} onChange={(e) => setRePassword(e.target.value)} className='mt-4'/>
      {(password !== repassword) && <div className="text-red-400">Пороли не совпадают</div>}

      {errorUser && <div className="text-red-400">Зарегестрированый пользователь</div>}

      <button onClick={handleSignUp} className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-2xl">Sign Up</button>
      <button onClick={handleLogin} className='mb-10'>Log In</button>
  
    </div>
   
  )
}

