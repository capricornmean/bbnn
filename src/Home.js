import { Link, Route } from "react-router-dom";

export default function Home() {
  return (<div className="w-full">
    <h1 className="mb-6">Hello :)</h1>
    <p className="mb-2">What do you want to do?</p>
    <ul>
      <li className="list-disc ml-5"><Link to="/form">Form</Link></li>
      <li className="list-disc ml-5"><Link to="/spreadsheet">Spreadsheet</Link></li>
    </ul>
  </div>);
}