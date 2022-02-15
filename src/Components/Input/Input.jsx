import './style.css';

export const Input = ({ handleInputChange, inputFields, isValidInput, inputs }) => {
  return (
    <>
      {inputFields.map((input, i) => (
        <div key={i}>
          <label htmlFor={input.name}
            style={{
              color: isValidInput && input.name !== Object.keys(inputs) ?
                "" : "red"
            }}
          >{input.children}</label>
          <input onChange={handleInputChange} type="text" pattern="[0-9]*" name={input.name} />
        </div>
      ))}
    </>
  )
}
