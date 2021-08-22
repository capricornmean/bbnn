import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Form from "./UserForm.js";
import Nav from "./Nav.js";
import FormComplete from "./UserFormComplete.js";
import Login from "./Login.js";
import Spreadsheet from "./Spreadsheet.js";
import useToken from "./useToken.js";
import ProductPage from "./ProductPage.js";

function App() {
  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <Nav token={token} setToken={setToken} />
      <div className="px-10">
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/form"><Form /></Route>
          <Route exact path="/formComplete"><FormComplete /></Route>
          <Route exact path="/login"><Login token={token} setToken={setToken} /></Route>
          <Route exact path="/spreadsheet"><Spreadsheet /></Route>
          <Route exact path="/productPage"><ProductPage /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
