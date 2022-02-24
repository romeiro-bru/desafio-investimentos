import './style.css';
import info from '../../../../assets/images/info.png';
import check from '../../../../assets/images/checkmark.png'

export const ButtonsGroup = ({ label, buttons, handleClick, selectedButtons }) => {
  return (
    <div>
      <label className="btn-group-label">{label}
        <img className="info" src={info} alt="info" />
      </label>
      {buttons.map((button, i) => (
        <button onClick={handleClick} type="button" name={button.name} key={i}
          style={{
            color: button.name === selectedButtons ? "var(--text-btn-focus)" : "",
            backgroundColor: button.name === selectedButtons ? "var(--primary-color)" : ""
          }}
        >
          <img className="check" src={check} alt="check"
            style={{ visibility: button.name === selectedButtons ? "visible" : "hidden" }}
          />
          {button.children}
        </button>
      ))}
    </div>
  )
}