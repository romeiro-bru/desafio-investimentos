import './style.css';
import { Simulator } from '../home/simulator';
import { Results } from '../home/results';

export function Home() {
  return (
    <div>
      <h1>Simulador de Investimentos</h1>
      <div className="wrapper">
        <Simulator />
        <Results />
      </div>
    </div>
  )
}