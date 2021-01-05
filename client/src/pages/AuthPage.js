import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    // console.log("form :>> ", form);
  };
  const registerHangler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };
  const loginHangler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      // message(data.message);
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>cut the link</h1>
        <div className="card blue lighten-4">
          <div className="card-content white-text">
            <span className="card-title">Sing in ..</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="enter email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="enter password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">password:</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn teal darken-2"
              style={{ margin: 10 }}
              disabled={loading}
              onClick={loginHangler}
            >
              enter
            </button>
            <button
              className="btn red accent-3 black-text"
              onClick={registerHangler}
              disabled={loading}
            >
              Regist...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
