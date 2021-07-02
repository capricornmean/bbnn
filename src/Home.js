import { Link, Route } from "react-router-dom";

export default function Home() {
  return (<>
    <h1>Hello :)</h1>
    <p>What do you want to do?</p>
    <ul className="my-ul">
      <li><Link to="/form">Form</Link></li>
      <li><Link to="/spreadsheet">Spreadsheet</Link></li>
    </ul>
  </>);
}