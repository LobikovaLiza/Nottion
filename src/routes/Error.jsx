import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div  className="prose flex flex-col mx-auto">
      <div  className="mx-auto">404</div>
      <h1 className="mx-auto text-2xl" >Page not found</h1>

      <div   className="prose get-2 mx-auto flex">
        <p>Go to page </p>
        <Link to={`/`}>
           Home
        </Link>
      </div>
    </div>
  );
}