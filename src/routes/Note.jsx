import { useContext, useState } from "react"
import { UserContext } from "../components/UserContextProvier"
import { Link, NavLink, Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"

export const loader = async ({ params: { id } }) => {
    
    const note = await fetch(
      `http://localhost:5001/Notes/${id}`
    ).then((response) => response.json());
  
    if (!note.id) {
        throw redirect(`/eror`);
      }
  
    return { note };
  };

export default function Note() {
  const  {user} = useContext(UserContext)
  const {note} = useLoaderData();
    
  const navigate = useNavigate()

  const handleDelete = async (note) =>  {
   
    await fetch(`http://localhost:5001/Notes/${note.id}`, { 
                   method: 'DELETE',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify(note)
                 })
        .then((resp) => resp.json())
        fetch(
          `http://localhost:5001/Notes?UserId=${user.id}`
        ).then((r) => r.json())

        navigate(`/notes` ) 
  }


  
  return (
    <div className="prose flex flex-col mx-auto">
        <div className="prose flex justify-between">
          <div>
             <Link to={`/notes`} className="no-underline bg-gray-400 px-6 py-1 w-20" >Back</Link>
          </div>
         
          <h1 className="mx-auto text-2xl" >{note.title}</h1>
          <div>
              <Link to={`/note/edit/${note.id}`} className=" no-underline" >✎</Link>
              <button onClick={(event) => {handleDelete(note); event.preventDefault()}}>🗑️</button>
          </div>
        </div>

        <pre className=" bg-gray-400 px-6 h-auto">{note.description}</pre>
        
    </div>
  )
}
