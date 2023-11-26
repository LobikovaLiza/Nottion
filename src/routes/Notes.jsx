import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/UserContextProvier"
import { Link } from "react-router-dom"


export default function Notes() {
  const  {user} = useContext(UserContext)
  const [notes, setNotes] = useState([]);
 
  const handleTime = (id) =>{
    const date = new Date(id)
    return date.toLocaleDateString()
  }

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
        .then((r) => setNotes(r))
      
  }

  useEffect(() => {
    fetch(
      `http://localhost:5001/Notes?UserId=${user.id}`
    ).then((r) => r.json())
    .then((r) => setNotes(r))

  }, []);

  return (
    
    <div className="prose flex flex-col mx-auto">
      
      <h1 className="mx-auto text-2xl" >Notes</h1>

      <Link
          to="/notes/add"
          className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-2xl mb-4 no-underline"
      >
        Add New Notes
      </Link>
      <div className="mb-10">
        {notes
        .sort((a, b) => { return b.id- a.id})
        .map((note) => (
            <Link key={note.id} to={`/notes/${note.id}`} className="flex justify-between no-underline bg-gray-300 px-5 py-1 mb-1">
                <div className="flex gap-1">
                  <div>{note.title}</div>
                  <div className=" text-gray-400">{handleTime(note.id)}</div>
                </div>

                <div>
                  <Link to={`/note/edit/${note.id}`} className=" no-underline" >✎</Link>
                  <button onClick={(event) => {handleDelete(note); event.preventDefault()}}>🗑️</button>
                </div>
            </Link>
        ))
        }
      </div>
    </div>
  )
}
