import './style.css';

const inputFields = [
  { name: "aporte-inicial", children: "Aporte Inicial", errorMessage: "Aporte deve ser um número" },
  { name: "aporte-mensal", children: "Aporte Mensal", errorMessage: "Aporte deve ser um número" },
  { name: "prazo", children: "Prazo (em meses)" },
  { name: "rentabilidade", children: "Rentabilidade" },
]

export const Input = ({ handleInputChange, isValidInput, inputs }) => {

  return (
    <>
      {inputFields.map((input, i) => (
        <div key={i}>
          <label htmlFor={input.name} style={{ color: isValidInput ? "" : "red" }}>
            {input.children}
          </label>
          <input
            type="text"
            name={input.name}
            value={inputs[input.name] || ""}
            onChange={handleInputChange}
            style={{ borderBottom: isValidInput ? "" : "1px solid red" }} />
          <span className="error-message"
            style={{ color: isValidInput ? "transparent" : "red" }}>
            {input.errorMessage}
          </span>
        </div>
      ))}
    </>
  )
}