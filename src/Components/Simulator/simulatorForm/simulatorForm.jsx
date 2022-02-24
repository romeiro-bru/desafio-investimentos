import axios from 'axios';
import "./style.css";
import { useState, useEffect, useCallback } from 'react';
import { ButtonsGroup } from './ButtonsGroup/ButtonsGroup';
import { Input } from './Input/Input';

const endpoint = "http://localhost:3000"

const buttonsRendimento = [
  { name: "bruto", children: "Bruto" },
  { name: "liquido", children: "Líquido", }
]
const buttonsIndex = [
  { name: "pre", children: "PRE" },
  { name: "pos", children: "PÓS" }
]
const buttonsInitialValue = { rendimento: "bruto", indexacao: "pos" }
const initialValue = {
  "aporte-inicial": "",
  "aporte-mensal": "",
  "prazo": "",
  "retabilidade": ""
}

export const SimulatorForm = ({ setFilteredSimulation }) => {
  const [simulations, setSimulations] = useState([])
  const [indicators, setIndicators] = useState([])
  const [inputs, setInputs] = useState(initialValue)
  const [selectedButtons, setSelectedButtons] = useState(buttonsInitialValue)
  const [isValidInput, setIsValidInput] = useState(true)
  const onlyNumbers = /^[0-9\b]+$/
  const isDisabled = Object.values(inputs)[0].length !== 0 && Object.values(inputs)[1].length

  const ipca = indicators.length === 0 ? "-" : indicators[1].valor
  const cdi = indicators.length === 0 ? "-" : indicators[0].valor
  const buttonDisabledBg = {
    backgroundColor: isDisabled && isValidInput ? "var(--primary-color)" : "",
    color: isDisabled && isValidInput ? "var(--text-btn-focus)" : "",
  }

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await axios.get(`${endpoint}/indicadores`)
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
        const response = await axios.get(`${endpoint}/simulacoes`)
        setSimulations(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSimulation()
  }, [])

  useEffect(() => {
    const filtered = simulations.filter(simulation =>
      simulation.tipoRendimento === selectedButtons.rendimento &&
      simulation.tipoIndexacao === selectedButtons.indexacao)
    setFilteredSimulation(filtered)
  }, [simulations])

  return (
    <form onSubmit={handleSubmit} onReset={() => setInputs(initialValue)}>
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
          <p name="ipca">{ipca}%</p>
        </div>
        <div className="indicators">
          <p>CDI (ao ano)</p>
          <p name="cdi">{cdi}%</p>
        </div>
      </div>
      <button type="reset" className="reset-btn">Limpar campos</button>
      <button disabled={!isDisabled} style={buttonDisabledBg} type="submit" className="submit-btn">
        Simular
      </button>
    </form>
  )
}