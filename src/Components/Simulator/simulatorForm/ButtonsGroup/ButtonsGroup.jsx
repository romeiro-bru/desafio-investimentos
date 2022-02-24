import './style.css';
import info from '../../../../assets/images/info.png';
import check from '../../../../assets/images/checkmark.png'

export const ButtonsGroup = ({ label, buttons, handleClick, selectedButtons }) => {
  const buttonStyle = {
    color: button.name === selectedButtons ? "var(--text-btn-focus)" : "",
    backgroundColor: button.name === selectedButtons ? "var(--primary-color)" : ""
  }

  const buttonImg = { visibility: button.name === selectedButtons ? "visible" : "hidden" }

  return (
    <div>
      <label className="btn-group-label">{label}
        <img className="info" src={info} alt="info" />
      </label>
      {buttons.map((button, i) => (
        <button onClick={handleClick} style={buttonStyle} type="button" name={button.name} key={i}>
          <img className="check" src={check} style={buttonImg} alt="check" />
          {button.children}
        </button>
      ))}
    </div>
  )
}