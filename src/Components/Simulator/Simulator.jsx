import './style.css';
import { useState } from 'react';
import { SimulatorForm } from './simulatorForm/simulatorForm';
import { SimulatorResults } from './simulatorResults/SimulatorResults';

export function Simulator() {
  const [simulations, setSimulations] = useState([])
  const [filteredSimulation, setFilteredSimulation] = useState([])

  return (
    <div>
      <h1>Simulador de Investimentos</h1>
      <div className="wrapper">
        <SimulatorForm simulations={simulations} setSimulations={setSimulations} setFilteredSimulation={setFilteredSimulation} />
        {filteredSimulation.length === 0 ? "" :
          <SimulatorResults filteredSimulation={filteredSimulation} />
        }
      </div>
    </div>
  )
}