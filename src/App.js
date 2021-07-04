import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Form from "./Form.js";
import Nav from "./Nav.js";
import FormComplete from "./FormComplete.js";
import Login from "./Login.js";
import Spreadsheet from "./Spreadsheet.js";
import useToken from "./useToken.js";

function App() {
  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <Nav token={token} />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/form"><Form /></Route>
        <Route exact path="/formComplete"><FormComplete /></Route>
        <Route exact path="/login"><Login setToken={setToken} /></Route>
        <Route exact path="/spreadsheet"><Spreadsheet /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
