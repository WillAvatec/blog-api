import { number, string, func } from "prop-types";

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
        required
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

export default InputField;
