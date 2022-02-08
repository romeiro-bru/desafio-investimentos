import './style.css';

export const Input = ({ handleInputChange, inputFields }) => {
  return (
    <>
      {inputFields.map((input, i) => (
        <div key={i}>
          <label htmlFor={input.name}>{input.children}</label>
          <input onChange={handleInputChange} type="text" name={input.name} />
        </div>
      ))}
    </>
  )
}