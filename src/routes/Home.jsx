import { useContext } from "react"
import { UserContext } from "../components/UserContextProvier"
import { NavLink, Outlet } from "react-router-dom"


export default function Home() {
  const  {user} = useContext(UserContext)

  return (
    
    <div>
      <header className='flex justify-between'>
        <div className='text-xl'>Hello, {user.email}</div>
        <div className='flex justify-between gap-4 text-xl'>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "black" : "text-gray-400"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            isActive ? "black" : "text-gray-400"
          }
        >
          Notes
        </NavLink>
        <NavLink
          to="/login"
          className="text-gray-400"
        >
          Log out
        </NavLink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      
    </div>
  )
}

