import InputField from "../components/Input";
import Logo from "../components/Logo";
import reducer from "../reducers/logIn";
import { useReducer } from "react";

const LogInForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
  });

  const handleName = (e) => {
    dispatch({ type: "username", val: e.target.value });
  };

  const handlePassword = (e) => {
    dispatch({ type: "password", val: e.target.value });
  };

  const logIn = (e) => {
    console.log(e);
    // Send info to server, to verify identity
    fetch("http://localhost:5000/log-in", {
      method: "POST",
      body: JSON.stringify(state),
      "Content-Type": "application/json",
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => console.log(jsonRes))
      .catch((err) => console.error(err));
  };

  return (
    <div className="wrapper">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <form id="log-in" className="form-page" onSubmit={logIn}>
        <h1> Welcome back </h1>
        <InputField
          name="username"
          type={"text"}
          min={5}
          max={20}
          cb={handleName}
          label="Username"
        />
        <InputField
          name="password"
          type="password"
          min={8}
          cb={handlePassword}
          label="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogInForm;
