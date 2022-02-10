import './style.css';
import { useState } from 'react';
import { Simulator } from './simulator';
import { Results } from './results/results';

export function Home() {
  const [simulations, setSimulations] = useState([])
  const [filteredSimulation, setFilteredSimulation] = useState([])

  return (
    <div>
      <h1>Simulador de Investimentos</h1>
      <div className="wrapper">
        <Simulator simulations={simulations} setSimulations={setSimulations} setFilteredSimulation={setFilteredSimulation} />
        {filteredSimulation.length === 0 ? "" :
          <Results filteredSimulation={filteredSimulation} />
        }
      </div>
    </div>
  )
}