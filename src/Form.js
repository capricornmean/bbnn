import { useState } from "react";
import { useHistory } from "react-router-dom";
import QuantityInput from "./QuantityInput.js";
import ProductInput from "./ProductInput.js";
import { GoogleSpreadsheet } from "google-spreadsheet";
const credentials = require('./key/mai_key.json');

export default function Form() {
  const history = useHistory();
  const [products, setProducts] = useState([{
    product: null,
    quantity: null
  }]);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const SPREADSHEET_ID = "1UcmNyg_nh6mhRt_5q6Pj7IXzkRDx4A1pL3F2H6WL8MU";
  const SHEET_ID = "0";
  const CLIENT_EMAIL = credentials.client_email;
  const PRIVATE_KEY = credentials.private_key;

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const result = await sheet.addRow(row);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    let newRow;
    let dt = new Date();
    /* DD.MM.YYYY hh:mm */
    let timestamp = (("0" + dt.getDate()).slice(-2)) + "/" + (("0" + (dt.getMonth() + 1)).slice(-2)) + "/" + (dt.getFullYear()) + " " + (("0" + dt.getHours()).slice(-2)) + ":" + (("0" + dt.getMinutes()).slice(-2));
    //console.log(timestamp);
    products.map(product => {
      newRow = {
        Timestamp: timestamp,
        Email: email,
        Username: username,
        Product: product.product,
        Quantity: product.quantity
      };
      appendSpreadsheet(newRow);
    });
    history.push("/formComplete");
  }

  function handleQuantityInputChange(e, pos) {
    const newProducts = products.map((product, index) => {
      if (pos === index) return { ...product, quantity: e.target.value };
      return product;
    });
    setProducts(newProducts);
  }

  function handleProductInputChange(e, pos) {
    const newProducts = products.map((product, index) => {
      if (pos === index) return { ...product, product: e.target.value };
      return product;
    });
    setProducts(newProducts);
    console.log(products);
  }

  function handleAddClick() {
    const newProducts = [...products, {
      product: null,
      quantity: null
    }];
    setProducts(newProducts);
  }

  function handleDeleteClick(index) {
    const newProducts = [...products.slice(0, index), ...products.slice(index + 1)];
    setProducts(newProducts);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="w-2/3 border-solid border-2 border-gray-300 rounded-md">
      <form onSubmit={handleFormSubmit}>
        <p className="indent-right font-weight-bold">* Required</p>
        <div className="flex flex-wrap">
          <div className="w-full">
            <label for="email" className="block">Email*</label>
            <input className="form-control my-input" type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Your email" required />
          </div>
        </div>
        <div class="form-group">
          <label for="username" className="font-weight-bold">Username*</label>
          <input className="form-control my-input" type="text" id="username" value={username} onChange={handleUsernameChange} placeholder="Your username" required />
        </div>
        <div class="form-group">
          <div class="form-row form-table">
            <div class="col-5">
              <label className="font-weight-bold">Product*</label>
            </div>
            <div class="col-3">
              <label className="font-weight-bold">Quantity*</label>
            </div>
          </div>
          {products.map((product, index) =>
            <div className="form-row">
              <div className="col-5">
                <ProductInput key={index} index={index} value={product.product} onInputChange={handleProductInputChange} />
              </div>
              <div className="col-3">
                <QuantityInput key={index} index={index} value={product.quantity} onInputChange={handleQuantityInputChange} />
              </div>
              <div className="col-2"><button className="form-control" key={index} type="button" onClick={() => handleDeleteClick(index)} disabled={products.length === 1}>Delete</button></div>
              {index === products.length - 1 ?
                <div className="col-2"><button className="form-control" key={index} type="button" onClick={handleAddClick}>Add line</button></div> :
                <div className="col-2"></div>
              }
            </div>
          )}
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}