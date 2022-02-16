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
          <input onChange={handleInputChange} name={input.name} type="text" pattern="[0-9]*"
            style={{
              borderBottom: isValidInput && input.name !== Object.keys(inputs) ?
                "" : "1px solid red"
            }} />
          {isValidInput && input.name !== Object.keys(inputs) ?
            "" : <span className="error-message">{input.errorMessage}</span>
          }
        </div>
      ))}
    </>
  )
}
