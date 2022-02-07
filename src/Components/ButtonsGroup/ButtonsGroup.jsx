import './style.css';
import info from '../../assets/images/info.png';

export const ButtonsGroup = ({ label, buttons }) => {
  return (
    <div>
      <label>{label}
        <img className="info" src={info} alt="info" />
      </label>
      {buttons.map((button, i) => (
        <button name={button.name} id={button.id} onClick={button.onClick} key={i} >
          {button.children}
        </button>
      ))}
    </div>
  )
}