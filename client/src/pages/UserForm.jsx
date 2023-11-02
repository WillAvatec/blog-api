import { number, string, func } from "prop-types";
import { useReducer } from "react";
import reducer from "../reducers/reducer";
import Logo from "../components/Logo";

const UserForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
    confirm: "",
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
      body: {
        username: state.username,
        password: state.password,
        confirm: state.confirm,
      },
    })
      .then((res) => {
        console.table(res);
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

const InputField = ({ max, min, type, name, cb, label }) => {
  return (
    <label>
      <input
        type={type}
        maxLength={max}
        minLength={min}
        name={name}
        onChange={cb}
        placeholder={label}
      />
    </label>
  );
};

InputField.propTypes = {
  max: number,
  min: number,
  type: string.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  cb: func,
};

InputField.defaultProps = {
  max: 99,
  min: 0,
  label: "Input",
};

export default UserForm;
