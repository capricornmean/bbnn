import { NavLink } from "react-router-dom";

export default function Nav({ token }) {
  return (
  <nav className="mb-6 py-4 px-10 bg-teal-500">
    <ul className="flex flex-wrap justify-start">
      <li className="inline-block">
        <NavLink to="/" className="text-white text-nav" activeClassName="font-extrabold" exact>Home</NavLink>
      </li>
      {!token && <li className="inline-block ml-8">
        <NavLink to="/login" className="text-white text-nav" activeClassName="font-extrabold" exact>Login</NavLink>
      </li>}
    </ul>
  </nav>
  )
}