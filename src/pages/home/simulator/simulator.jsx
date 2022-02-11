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
  { id: 0, name: "pre", children: "PRÉ" },
  { id: 1, name: "pos", children: "POS", }
]
const inputFields = [
  { id: 0, name: "aporte-inicial", children: "Aporte Inicial" },
  { id: 0, name: "aporte-mensal", children: "Aporte Mensal" },
  { id: 0, name: "prazo", children: "Prazo (em meses)" },
  { id: 0, name: "rentabilidade", children: "Rentabilidade" },
]

export const Simulator = ({ setSimulations, simulations, setFilteredSimulation }) => {
  const [indicadores, setIndicadores] = useState([])
  const [inputs, setInputs] = useState({})
  const [selectedButton, setSelectedButton] = useState("bruto")

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
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }, [inputs]
  )
  const handleClick = (e) => {
    e.preventDefault()
    if (selectedButton !== e.target.name) {
      setSelectedButton(e.target.name);
    }
  }

  //add validation, only make call if input fields are not empty
  //set button'bruto' and 'pos' as default
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
    setFilteredSimulation(simulations.filter(x => x.tipoRendimento === selectedButton && x.tipoIndexacao === "pre"))
  }, [simulations])

  return (
    <form onSubmit={handleSubmit}>
      <h2>Simulador</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <ButtonsGroup handleClick={handleClick} defaultButton={selectedButton} selectedButton={selectedButton} buttons={buttonsRendimento} label="Rendimento" />
        <ButtonsGroup handleClick={handleClick} defaultButton={selectedButton} selectedButton={selectedButton} buttons={buttonsIndex} label="Tipos de indexação" />
        <Input handleInputChange={handleInputChange} inputFields={inputFields} />
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
      <button type="submit" className="submit-btn">Simular</button>
    </form>
  )
}