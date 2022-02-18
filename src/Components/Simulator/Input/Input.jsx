import './style.css';
import InputMask from 'react-input-mask';

const inputFields = [
  { name: "aporte-inicial", children: "Aporte Inicial", errorMessage: "Aporte deve ser um número" },
  { name: "aporte-mensal", children: "Aporte Mensal", errorMessage: "Aporte deve ser um número" },
  { name: "prazo", children: "Prazo (em meses)" },
  { name: "rentabilidade", children: "Rentabilidade" },
]

export const Input = ({ handleInputChange, isValidInput }) => {

  const defaultMask = {
    prefix: 'R$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 7, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
  }

  return (
    <>
      {inputFields.map((input, i) => (
        <div key={i}>
          <label htmlFor={input.name} style={{ color: isValidInput ? "" : "red" }}>
            {input.children}
          </label>
          <InputMask
            mask={defaultMask}
            type="text"
            name={input.name}
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