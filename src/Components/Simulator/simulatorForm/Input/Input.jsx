import './style.css';

const inputFields = [
  { name: "aporte-inicial", children: "Aporte Inicial", errorMessage: "Aporte deve ser um número" },
  { name: "aporte-mensal", children: "Aporte Mensal", errorMessage: "Aporte deve ser um número" },
  { name: "prazo", children: "Prazo (em meses)" },
  { name: "rentabilidade", children: "Rentabilidade" },
]

export const Input = ({ handleInputChange, isValidInput, inputs }) => {
  const checkInputLabel = { color: isValidInput ? "" : "red" }
  const checkInputBorder = { borderBottom: isValidInput ? "" : "1px solid red" }
  const checkInputMessage = { color: isValidInput ? "transparent" : "red" }

  return (
    <>
      {inputFields.map((input, i) => (
        <div key={i}>
          <label htmlFor={input.name} style={checkInputLabel}>
            {input.children}
          </label>
          <input
            type="text"
            name={input.name}
            value={inputs[input.name]}
            onChange={handleInputChange}
            style={checkInputBorder} />
          <span className="error-message" style={checkInputMessage}>
            {input.errorMessage}
          </span>
        </div>
      ))}
    </>
  )
}