import './style.css';
import info from '../../assets/images/info.png';

export const ButtonsGroup = ({ label, buttons, handleClick }) => {
  return (
    <div>
      <label className="btn-group-label">{label}
        <img className="info" src={info} alt="info" />
      </label>
      {buttons.map((button, i) => (
        <button type="button" onClick={handleClick} name={button.name} id={button.id} onClick={button.onClick} key={i} >
          {button.children}
        </button>
      ))}
    </div>
  )
}