import { Link } from "react-router-dom";

export default function FormComplete() {
    return (<div>
        <h2>Form Submitted! Thank you :)</h2>
        <div className="mt-5 text-teal-600">
            <Link to="/">Return to Home page</Link>
        </div>
    </div>);
}