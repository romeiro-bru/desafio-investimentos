export const Input = ({ name, label, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange} type="text" name={name} />
    </div>
  )
}