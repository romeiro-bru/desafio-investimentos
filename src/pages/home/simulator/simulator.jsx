import axios from 'axios';
import "./style.css";
import { useState, useEffect, useCallback } from 'react';
import { ButtonsGroup } from '../../../Components/ButtonsGroup/ButtonsGroup';
import { Input } from '../../../Components/Input/Input';

const buttonsRendimento = [
  { id: 0, name: "bruto", children: "Bruto" },
  { id: 1, name: "liquido", children: "Líquido", }
]
const buttonsIndex = [
  { id: 2, name: "pre", children: "PRÉ" },
  { id: 3, name: "pos", children: "POS" }
]

const inputFields = [
  { id: 0, name: "aporte-inicial", children: "Aporte Inicial" },
  { id: 1, name: "aporte-mensal", children: "Aporte Mensal" },
  { id: 2, name: "prazo", children: "Prazo (em meses)" },
  { id: 3, name: "rentabilidade", children: "Rentabilidade" },
]


export const Simulator = ({ setSimulations, simulations, setFilteredSimulation }) => {
  const [indicadores, setIndicadores] = useState([])
  const [inputs, setInputs] = useState({})
  const [selectedButtons, setSelectedButtons] = useState({ rendimento: "bruto", indexacao: "pos" })
  const [isValidInput, setIsValidInput] = useState(true)

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await axios.get("http://localhost:3000/indicadores")
        setIndicadores(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchIndicators()
  }, [])

  const handleInputChange = useCallback((e) => {
    const onlyNumbers = /^[0-9\b]+$/
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
    setFilteredSimulation(simulations.filter(x =>
      x.tipoRendimento === selectedButtons.rendimento &&
      x.tipoIndexacao === selectedButtons.indexacao))
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
        <div className="indicadores">
          <p>IPCA (ao ano)</p>
          <p name="ipca">{indicadores.length === 0 ? "-" : indicadores[1].valor}%</p>
        </div>
        <div className="indicadores">
          <p>CDI (ao ano)</p>
          <p name="cdi">{indicadores.length === 0 ? "-" : indicadores[0].valor}%</p>
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