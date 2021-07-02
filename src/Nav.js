import { Link } from "react-router-dom";

export default function Nav({ token }) {
  return (<nav>
    <ul className="my-ul">
      <li className="my-li">
        <Link to="/">Home</Link>
      </li>
      {!token && <li className="my-li">
        <Link to="/login">Login</Link>
      </li>}
    </ul>
  </nav>)
}