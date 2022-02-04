import './style.css';

export function Simulador() {
  return (

    <div className="wrapper">

      <form action="">
        <h2>Simulador</h2>

        <div className="display-flex">
          <section className="rendimento">
            <label htmlFor="rendimento">Rendimento</label>
            <button>Bruto</button>
            <button>Líquido</button>

            <label htmlFor="aporte-inicial">Aporte Inicial</label>
            <input type="text" name="aporte-inicial" />

            <label htmlFor="prazo">Prazo (em meses)</label>
            <input type="text" name="prazo" />

            <label htmlFor="ipca">IPCA (ao ano)</label>
            <input type="text" name="ipca" />
          </section>

          <section className="tipos-indexaçao">
            <label htmlFor="indexaçao">Tipos de indexação</label>
            <button>PRÉ</button>
            <button>PÓS</button>
            <button>FIXADO</button>

            <label htmlFor="aporte-mensal">Aporte Mensal</label>
            <input type="text" name="" id="" />

            <label htmlFor="rentabilidade">Rentabilidade</label>
            <input type="text" name="rentabilidade" />

            <label htmlFor="cdi">CDI (ao ano)</label>
            <input type="text" name="cdi" />
          </section>
        </div>

        <button>Limpar campos</button>
        <button>Simular</button>
      </form>

      <section className="resultado">
        <h2>Resultado da Simulação</h2>
      </section>
    </div>
  )
}