import './style.css';

export const Input = ({ handleInputChange, inputFields, isValidInput, inputs }) => {
  return (
    <>
      {inputFields.map((input, i) => (
        <div key={i}>
          <label htmlFor={input.name}
            style={{
              color: isValidInput && input.name !== Object.keys(inputs) ?
                "" : "red",
            }}
          >{input.children}</label>
          <input onChange={handleInputChange} name={input.name} type="text"
            style={{
              borderBottom: isValidInput && input.name !== Object.keys(inputs) ?
                "" : "1px solid red"
            }} />
          <span className="error-message"
            style={{
              color: isValidInput && input.name !== Object.keys(inputs) ? "transparent" : "red"
            }}>{input.errorMessage}</span>
        </div>
      ))}
    </>
  )
}