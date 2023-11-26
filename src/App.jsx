import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login'
import Home from './routes/Home'
import UserContextProvider from './components/UserContextProvier';
import RequireAuth from './components/RequireAuth';
import SignUp from './routes/SignUp';
import About from './routes/About';
import Notes from './routes/Notes';
import AddNotes from './routes/AddNotes';
import EditNote, { loader as EditNotesLoader  } from './routes/EditNote';
import Note, { loader as NoteLoader } from './routes/Note';
import Error from './routes/Error';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
    <RequireAuth>
      <Home />
    </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/notes/:id",
        loader: NoteLoader,
        element: <Note />,
      },
      {
        path: "/notes/add",
        element: <AddNotes />,
      },
      {
        path: "/note/edit/:id",
        loader: EditNotesLoader,
        element: <EditNote />,
      },
      {
        path: "/eror",
        element: <Error />
      }
    ]
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
])

export default function App() {
  return (
    <div>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      <hr />
      <div className='flex justify-between text-gray-400'>
        <p>Created by: Lobikova Liza </p>
        <p>BSU: 2023</p>
      </div>
    </div>
    
    
  ) 
}

