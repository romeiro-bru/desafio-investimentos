import './style.css';
import axios from 'axios';
import { useEffect } from 'react';

export function Simulador() {
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/indicadores")
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])

  return (

    <div className="wrapper">

      <form action="">
        <h2>Simulador</h2>

        <div className="display-flex">
          <section className="rendimento">
            <label htmlFor="rendimento">Rendimento</label>
            <button className="left-btn">Bruto</button>
            <button className="right-btn">Líquido</button>

            <label htmlFor="aporte-inicial">Aporte Inicial</label>
            <input type="text" name="aporte-inicial" />

            <label htmlFor="prazo">Prazo (em meses)</label>
            <input type="text" name="prazo" />

            <label htmlFor="ipca">IPCA (ao ano)</label>
            <input type="text" name="ipca" />
          </section>

          <section className="tipos-indexaçao">
            <label htmlFor="indexaçao">Tipos de indexação</label>
            <button className="left-btn">PRÉ</button>
            <button>PÓS</button>
            <button className="right-btn">FIXADO</button>

            <label htmlFor="aporte-mensal">Aporte Mensal</label>
            <input type="text" name="" id="" />

            <label htmlFor="rentabilidade">Rentabilidade</label>
            <input type="text" name="rentabilidade" />

            <label htmlFor="cdi">CDI (ao ano)</label>
            <input type="text" name="cdi" />
          </section>
        </div>

        <button className="reset-btn">Limpar campos</button>
        <button className="submit-btn">Simular</button>
      </form>

      <section className="resultado">
        <h2>Resultado da Simulação</h2>
      </section>
    </div>
  )
}