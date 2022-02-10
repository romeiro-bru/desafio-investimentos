export const Results = ({ simulations, filteredSimulations }) => {
  console.log("results", simulations)
  console.log("filtered", filteredSimulations)

  return (
    <section className="results">
      <h2>Resultado da Simulação</h2>
      <ul>
        <li>{filteredSimulations[0].valorFinalBruto}</li>
        <li>{filteredSimulations[0].aliquoaIR}</li>
        <li>{filteredSimulations[0].valorPagoIR}</li>

        <li>{filteredSimulations[0].valorFinalLiquido}</li>
        <li>{filteredSimulations[0].valorTotalInvestido}</li>
        <li>{filteredSimulations[0].ganhoLiquido}</li>
      </ul>
    </section>
  )
}