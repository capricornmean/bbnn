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
    <form className="w-1/2 p-16 border-solid border-2 border-teal-500 rounded-md" onSubmit={handleFormSubmit}>
      <p className="text-right font-semibold">* Required</p>
      <div className="w-full">
        <label for="email" className="block my-4 font-semibold">Email*</label>
        <input className="block mt-1 mb-2 pb-1 border-b border-teal-500 focus:outline-none" type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Your email" required />
      </div>
      <div className="w-full">
        <label for="username" className="block my-4 font-semibold">Username*</label>
        <input className="block mt-1 mb-2 pb-1 border-b border-teal-500 focus:outline-none" type="text" id="username" value={username} onChange={handleUsernameChange} placeholder="Your username" required />
      </div>
      <div className="grid grid-cols-10 mt-4 mb-2">
        <label className="col-span-4 font-semibold">Product*</label>
        <label className="col-span-2 font-semibold">Quantity*</label>
      </div>
      {products.map((product, index) =>
        <div className="grid grid-cols-10">
          <div className="col-span-4 mr-3 my-1">
            <ProductInput key={index} index={index} value={product.product} onInputChange={handleProductInputChange} />
          </div>
          <div className="col-span-2 mr-3 my-1">
            <QuantityInput key={index} index={index} value={product.quantity} onInputChange={handleQuantityInputChange} />
          </div>
          <div className="col-span-2 mr-3 my-1">
            <button className="w-full border border-teal-500 rounded-md py-1 disabled:opacity-50 disabled:pointer-events-auto disabled:cursor-not-allowed" key={index} type="button" onClick={() => handleDeleteClick(index)} disabled={products.length === 1}>Delete</button>
          </div>
          <div className="col-span-2 my-1">
            {index === products.length - 1 ?
              <button className="w-full border border-teal-500 rounded-md py-1" key={index} type="button" onClick={handleAddClick}>Add line</button> :
              <div />
            }
          </div>
        </div>
      )}
      <div className="w-full">
        <button className="mt-6 bg-teal-500 rounded-md px-4 py-1 text-white" type="submit">Submit</button>
      </div>
    </form>
  );
}