import { NavLink } from "react-router-dom";

export default function Nav({ token, setToken }) {
  function handleLogoutClick() {
    setToken({ token: "" });
  }

  return (
    <nav className="mb-6 py-4 px-10 bg-teal-500">
      <ul className="flex flex-wrap justify-start">
        <li className="inline-block">
          <NavLink to="/" className="text-white text-nav" activeClassName="font-extrabold" exact>Home</NavLink>
        </li>
        <li className="inline-block ml-8">
          <NavLink to="/productPage" className="text-white text-nav" activeClassName="font-extrabold" exact>Products</NavLink>
        </li>
        {!token && <li className="inline-block ml-8">
          <NavLink to="/login" className="text-white text-nav" activeClassName="font-extrabold" exact>Login</NavLink>
        </li>}
        {token && <li className="inline-block ml-8">
          <button className="text-white text-nav" onClick={handleLogoutClick}>Logout</button>
        </li>}
      </ul>
    </nav>
  )
}