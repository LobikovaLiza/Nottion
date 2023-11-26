import { useContext, useState } from "react"
import { UserContext } from "../components/UserContextProvier"
import { Link, NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom"

export const loader = async ({ params: { id } }) => {
    
    const note = await fetch(
      `http://localhost:5001/Notes/${id}`
    ).then((response) => response.json());
  
    if (!note.id) {
      throw redirect(`/eror`);
    }

    return { note };
  };

export default function EditNote() {
  const  {user} = useContext(UserContext)
  const {note} = useLoaderData();
  const [title, setTitle]= useState(note.title)
  const [description, setDescription]= useState(note.description)

  const navigate = useNavigate()
  function handleAddNotes(){
    const obj =  {
           "title": title, 
           "description": description
         }
      fetch(`http://localhost:5001/Notes/${note.id}`, { 
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj)
                      })
             .then((resp) => resp.json())
    navigate(`/notes/${note.id}`)
  }
  return (
    
    

    <div className="prose flex flex-col mx-auto">
      
      <div className="prose flex flex-col ">
          <Link to={`/notes`} className="no-underline bg-gray-400 px-6 w-20" >Back</Link>
          <h1 className="mx-auto text-2xl" >Edit Notes</h1>
      </div>

        <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className='mt-4 bg-gray-300 '/>
        {!title && <div className="text-red-400">Пустым быть не может!</div>}

        <textarea placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} className='mt-2 bg-gray-400' />
        
        <button 
          className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-2xl mb-4 no-underline"
          onClick={() => { if (title != '') handleAddNotes(); }} 
        >
          Edit
        </button>
    </div>
  )
}
