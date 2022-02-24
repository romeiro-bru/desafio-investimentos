import './style.css';
import { useState } from 'react';
import { SimulatorForm } from './simulatorForm/simulatorForm';
import { SimulatorResults } from './simulatorResults/SimulatorResults';

export function Simulator() {
  const [filteredSimulation, setFilteredSimulation] = useState([])

  return (
    <div>
      <h1>Simulador de Investimentos</h1>
      <div className="wrapper">
        <SimulatorForm setFilteredSimulation={setFilteredSimulation} />
        {filteredSimulation.length === 0 ? "" :
          <SimulatorResults filteredSimulation={filteredSimulation} />
        }
      </div>
    </div>
  )
}