import './style.css';

export const Input = ({ name, label, onChange }) => {
  return (
    <div>
      <label htmlFor={name} name={name}>{label}</label>
      <input onChange={onChange} type="text" name={name} />
    </div>
  )
}