import axios from 'axios';
import "./style.css";
import { useState, useEffect, useCallback } from 'react';
import { ButtonsGroup } from './ButtonsGroup/ButtonsGroup';
import { Input } from './Input/Input';

const buttonsRendimento = [
  { name: "bruto", children: "Bruto" },
  { name: "liquido", children: "Líquido", }
]
const buttonsIndex = [
  { name: "pre", children: "PRE" },
  { name: "pos", children: "PÓS" }
]
const initialValue = {
  "aporte-inicial": "",
  "aporte-mensal": "",
  "prazo": "",
  "retabilidade": ""
}

export const SimulatorForm = ({ setSimulations, simulations, setFilteredSimulation }) => {
  const [indicators, setIndicators] = useState([])
  const [inputs, setInputs] = useState(initialValue)
  const [selectedButtons, setSelectedButtons] = useState({ rendimento: "bruto", indexacao: "pos" })
  const [isValidInput, setIsValidInput] = useState(true)
  const onlyNumbers = /^[0-9\b]+$/
  const isDisabled = Object.values(inputs)[0].length !== 0 && Object.values(inputs)[1].length

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await axios.get("http://localhost:3000/indicadores")
        setIndicators(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchIndicators()
  }, [])

  const handleInputChange = useCallback((e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    setIsValidInput(onlyNumbers.test(e.target.value))
  }, [inputs]
  )

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const fetchSimulation = async () => {
      try {
        const response = await axios.get("http://localhost:3000/simulacoes")
        setSimulations(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSimulation()
  }, [])

  useEffect(() => {
    setFilteredSimulation(simulations.filter(simulation =>
      simulation.tipoRendimento === selectedButtons.rendimento &&
      simulation.tipoIndexacao === selectedButtons.indexacao))
  }, [simulations])

  return (
    <form onSubmit={handleSubmit}>
      <h2>Simulador</h2>
      <div className="simulator">
        <ButtonsGroup handleClick={(e) => setSelectedButtons({
          rendimento: (e.target.name),
          indexacao: selectedButtons.indexacao
        })}
          defaultButton={selectedButtons.rendimento}
          selectedButtons={selectedButtons.rendimento}
          buttons={buttonsRendimento}
          label="Rendimento" />
        <ButtonsGroup handleClick={(e) => setSelectedButtons({
          rendimento: selectedButtons.rendimento,
          indexacao: (e.target.name)
        })}
          defaultButton={selectedButtons.indexacao}
          selectedButtons={selectedButtons.indexacao}
          buttons={buttonsIndex}
          label="Tipos de indexação" />
        <Input isValidInput={isValidInput} inputs={inputs} handleInputChange={handleInputChange} />
        <div className="indicators">
          <p>IPCA (ao ano)</p>
          <p name="ipca">{indicators.length === 0 ? "-" : indicators[1].valor}%</p>
        </div>
        <div className="indicators">
          <p>CDI (ao ano)</p>
          <p name="cdi">{indicators.length === 0 ? "-" : indicators[0].valor}%</p>
        </div>
      </div>
      <button onClick={() => setInputs(initialValue)} type="reset" className="reset-btn">Limpar campos</button>
      <button disabled={!isDisabled} type="submit" className="submit-btn"
        style={{
          backgroundColor: isDisabled && isValidInput ? "#f58c4b" : "",
          color: isDisabled && isValidInput ? "white" : "",
        }}
      >Simular</button>
    </form>
  )
}