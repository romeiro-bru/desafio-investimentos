import axios from 'axios';
import { useState, useEffect } from 'react';
import { ButtonsGroup } from '../../Components/ButtonsGroup';
import { Input } from '../../Components/Input';

const buttonsRendimento = [
  { id: 0, name: "bruto", onClick: () => console.log("bruto"), children: "Bruto" },
  { id: 1, name: "liquido", onClick: () => console.log("liquido"), children: "Líquido", }
]

const buttonsIndex = [
  { id: 0, name: "pre", onClick: () => console.log("pré"), children: "PRÉ" },
  { id: 1, name: "pos", onClick: () => console.log("pós"), children: "POS", }
]

export const Simulator = () => {
  const [indicadores, setIndicadores] = useState([])
  const [inputs, setInputs] = useState({})

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/indicadores")
        setIndicadores(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])

  //add usecallback
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
  }

  //add usecallback
  const handleSubmit = (e) => {
    e.preventDefault()
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/simulacoes")
        console.log(response.data.filter(x => x.tipoIndexacao === "pre"))
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }
  return (
    <form onSubmit={handleSubmit} action="">
      <h2>Simulador</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <ButtonsGroup label="Rendimento" buttons={buttonsRendimento} />
        <ButtonsGroup label="Tipos de indexação" buttons={buttonsIndex} />
        <Input onChange={handleInputChange} name="aporte-inicial" label="Aporte Inicial" />
        <Input onChange={handleInputChange} name="aporte-mensal" label="Aporte Mensal" />
        <Input onChange={handleInputChange} name="prazo" label="Prazo (em meses)" />
        <Input onChange={handleInputChange} name="rentabilidade" label="Rentabilidade" />
        <div>
          <p>IPCA (ao ano)</p>
          <p name="ipca">{indicadores.length === 0 ? "-" : indicadores[1].valor}%</p>
        </div>
        <div>
          <p>CDI (ao ano)</p>
          <p name="cdi">{indicadores.length === 0 ? "-" : indicadores[0].valor}%</p>
        </div>
      </div>
      <button type="reset" className="reset-btn">Limpar campos</button>
      <button type="submit" className="submit-btn">Simular</button>
    </form>
  )
}