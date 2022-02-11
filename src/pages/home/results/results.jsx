import './style.css';

export const Results = ({ filteredSimulation }) => {

  return (
    <section className="results">
      <h2>Resultado da Simulação</h2>
      <ul className="results-list">
        <li>
          <p>Valor Final Bruto</p>
          <p>R$ {filteredSimulation[0].valorFinalBruto}
          </p>
        </li>
        <li>
          <p>Alíquota do IR</p>
          <p>{filteredSimulation[0].aliquoaIR === undefined && 0}%</p>
        </li>
        <li>
          <p>Valor Pago em IR</p>
          <p>R$ {filteredSimulation[0].valorPagoIR}</p>
        </li>

        <li>
          <p>Valor Final Líquido</p>
          <p className="green-text">R$ {filteredSimulation[0].valorFinalLiquido}</p>
        </li>
        <li>
          <p>Valor Total Investido</p>
          <p>R$ {filteredSimulation[0].valorTotalInvestido}</p>
        </li>
        <li>
          <p>Ganho Líquido</p>
          <p className="green-text">R$ {filteredSimulation[0].ganhoLiquido}</p>
        </li>
      </ul>
    </section >
  )
}