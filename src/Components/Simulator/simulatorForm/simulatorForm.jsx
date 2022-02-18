import axios from 'axios';
import "./style.css";
import { useState, useEffect, useCallback } from 'react';
import { ButtonsGroup } from '../../Simulator/ButtonsGroup/ButtonsGroup';
import { Input } from '../../Simulator/Input/Input';

const buttonsRendimento = [
  { id: 0, name: "bruto", children: "Bruto" },
  { id: 1, name: "liquido", children: "Líquido", }
]
const buttonsIndex = [
  { id: 2, name: "pre", children: "PRE" },
  { id: 3, name: "pos", children: "PÓS" }
]

const inputFields = [
  { name: "aporte-inicial", children: "Aporte Inicial", errorMessage: "Aporte deve ser um número", required: true },
  { name: "aporte-mensal", children: "Aporte Mensal", errorMessage: "Aporte deve ser um número", required: true },
  { name: "prazo", children: "Prazo (em meses)" },
  { name: "rentabilidade", children: "Rentabilidade" },
]

export const SimulatorForm = ({ setSimulations, simulations, setFilteredSimulation }) => {
  const [indicators, setIndicators] = useState([])
  const [inputs, setInputs] = useState({})
  const [selectedButtons, setSelectedButtons] = useState({ rendimento: "bruto", indexacao: "pos" })
  const [isValidInput, setIsValidInput] = useState(true)
  const onlyNumbers = /^[0-9\b]+$/

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
        <Input isValidInput={isValidInput} inputs={inputs} handleInputChange={handleInputChange} inputFields={inputFields} />
        <div className="indicators">
          <p>IPCA (ao ano)</p>
          <p name="ipca">{indicators.length === 0 ? "-" : indicators[1].valor}%</p>
        </div>
        <div className="indicators">
          <p>CDI (ao ano)</p>
          <p name="cdi">{indicators.length === 0 ? "-" : indicators[0].valor}%</p>
        </div>
      </div>
      <button type="reset" className="reset-btn">Limpar campos</button>
      <button disabled={Object.values(inputs).length < 4} type="submit" className="submit-btn"
        style={{
          backgroundColor: Object.values(inputs).length >= 4 && isValidInput ? "#f58c4b" : "",
          color: Object.values(inputs).length >= 4 && isValidInput ? "white" : "",
        }}
      >Simular</button>
    </form>
  )
}