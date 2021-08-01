import { useState } from "react";
import Form from "./AdminForm.js";

export default function Spreadsheet() {
  const [fromTotalProduct, setFromTotalProduct] = useState();
  const [toTotalProduct, setToTotalProduct] = useState();
  const [fromTotalPerUser, setFromTotalPerUser] = useState();
  const [toTotalPerUser, setToTotalPerUser] = useState();

  function handleTotalProductSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8080/totalProduct', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromRow: fromTotalProduct,
        toRow: toTotalProduct
      })
    })
      .then(response => response.text())
      .then(data => {
        if (data === "OK") {
          setFromTotalProduct("");
          setToTotalProduct("");
        }
        else {
          
        }
      });
  }

  function handleTotalPerUserSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8080/totalPerUser', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromRow: fromTotalPerUser,
        toRow: toTotalPerUser
      })
    })
      .then(response => response.text())
      .then(data => {
        if (data === "OK") {
          setFromTotalPerUser("");
          setToTotalPerUser("");
        }
        else {
          
        }
      });
  }

  function handleTotalProductFromInput(e) {
    setFromTotalProduct(e.target.value);
  }

  function handleTotalProductToInput(e) {
    setToTotalProduct(e.target.value);
  }

  function handleTotalPerUserFromInput(e) {
    setFromTotalPerUser(e.target.value);
  }

  function handleTotalPerUserToInput(e) {
    setToTotalPerUser(e.target.value);
  }

  return (
    <div className="h-80screen grid grid-cols-4">
      <div className="col-span-3 mr-8">
        <iframe
          className="w-full h-full border border-teal-500"
          src="https://docs.google.com/spreadsheets/d/1UcmNyg_nh6mhRt_5q6Pj7IXzkRDx4A1pL3F2H6WL8MU/edit?usp=sharing"
        />
      </div>
      <div className="col-span-1">
        <h3 className="font-bold">Tools</h3>
        <h6 className="mt-4 mb-1">Total Product</h6>
        <Form fromInput={fromTotalProduct} toInput={toTotalProduct} onFromInputChange={handleTotalProductFromInput}
          onToInputChange={handleTotalProductToInput} onFormSubmit={handleTotalProductSubmit} />
        <h6 className="mt-7 mb-1">Total Per User</h6>
        <Form fromInput={fromTotalPerUser} toInput={toTotalPerUser} onFromInputChange={handleTotalPerUserFromInput}
          onToInputChange={handleTotalPerUserToInput} onFormSubmit={handleTotalPerUserSubmit} />
      </div>
    </div>
  );
}