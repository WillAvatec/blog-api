import { useReducer } from "react";
import reducer from "../reducers/reducer";
import Logo from "../components/Logo";
import InputField from "../components/Input";

const UserForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
    dbl_password: "",
  });

  const handleName = (e) => {
    dispatch({ type: "update-username", newValue: e.target.value });
  };

  const handlePassword = (e) => {
    dispatch({ type: "update-password", newValue: e.target.value });
  };

  const handleConfirmation = (e) => {
    dispatch({ type: "update-confirm", newValue: e.target.value });
  };

  const postNewUser = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="wrapper">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <form id="sign-in" onSubmit={postNewUser}>
        <h1> Create your account </h1>
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
        <InputField
          name="confirm-pass"
          type="password"
          min={8}
          cb={handleConfirmation}
          label="Confirm Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
