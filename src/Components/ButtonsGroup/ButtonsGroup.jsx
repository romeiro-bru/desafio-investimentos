import './style.css';
import info from '../../assets/images/info.png';
import check from '../../assets/images/checkmark.png'

export const ButtonsGroup = ({ label, buttons, handleClick, selectedButton }) => {
  return (
    <div>
      <label className="btn-group-label">{label}
        <img className="info" src={info} alt="info" />
      </label>
      {buttons.map((button, i) => (
        <button onClick={handleClick} type="button" name={button.name} id={button.id} key={i}
          style={{
            color: button.name === selectedButton ? "white" : "",
            backgroundColor: button.name === selectedButton ? "#f58c4b" : ""
          }}
        >
          {button.name === selectedButton ?
            <img className="check" src={check} alt="check" />
            : ""
          }
          {button.children}
        </button>
      ))}
    </div>
  )
}