import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from "react-router-dom";

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
}

export default function Login({ token, setToken }) {
  const history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token);
    if (token.token) {
      history.push("/");
    }
    else {
      history.go(0);
    }
  }

  return (
    <div>
      {!token && <form className="w-1/2 pt-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-5">
          <div className="col-span-1">
            <label for="username" className="block my-4 font-semibold">Username</label>
          </div>
          <div className="col-span-3">
            <input className="h-2/3 w-full block my-2 py-1 pl-3 border border-teal-500 focus:outline-none" type="text" id="username" value={username} onChange={e => setUserName(e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-1">
            <label for="password" className="block my-4 font-semibold">Password</label>
          </div>
          <div className="col-span-3">
            <input className="h-2/3 w-full block my-2 py-1 pl-3 border border-teal-500 focus:outline-none" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
        </div>
        <div className="w-full">
          <button className="mt-6 bg-teal-500 rounded-md px-4 py-1.5 text-white" type="submit">Submit</button>
        </div>
      </form>
      }
      {token && <Redirect to='/' />}
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}