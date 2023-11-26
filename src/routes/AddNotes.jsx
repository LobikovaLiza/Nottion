import { useContext, useState } from "react"
import { UserContext } from "../components/UserContextProvier"
import { Link, useNavigate } from "react-router-dom"


export default function AddNotes() {
  const  {user} = useContext(UserContext)
  const [title, setTitle]= useState('')
  const [description, setDescription]= useState('')


  const navigate = useNavigate()

  const handleAddNotes = async () => {
    const note =  {
           "id": Date.now(),
           "UserId": user.id,
           "title": title, 
           "description": description
         }
      await fetch(`http://localhost:5001/Notes`, { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(note)
                      })
             .then((resp) => resp.json())
             .then(() => {
              navigate(`/notes/${note.id}`);
            })     

  }
  return (
    
    <div className="prose flex flex-col mx-auto">
        <div className="prose flex flex-col ">
          <Link to={`/notes`} className="no-underline bg-gray-400 px-6 w-20" >Back</Link>
          <h1 className="mx-auto text-2xl" >Create New Notes</h1>
        </div>
        
        <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className='mt-4 bg-gray-300'/>
        {!title && <div className="text-red-400">Пустым быть не может!</div>}
        <textarea placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} className='mt-2 bg-gray-400'/>
        
        <button
          onClick={() => { if (title != '') handleAddNotes(); }} 
          className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-2xl mb-4 no-underline"
        >
          Create
        </button>
    </div>
  )
}
