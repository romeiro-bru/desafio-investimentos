import './style.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function Simulador() {
  const [indicadores, setIndicadores] = useState([])

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
  console.log(indicadores)

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
          </section>

          <section className="tipos-indexacao">
            <label htmlFor="indexaçao">Tipos de indexação</label>
            <button className="left-btn">PRÉ</button>
            <button>PÓS</button>
            <button className="right-btn">FIXADO</button>

            <label htmlFor="aporte-mensal">Aporte Mensal</label>
            <input type="text" name="aporte-mensal" />

            <label htmlFor="rentabilidade">Rentabilidade</label>
            <input type="text" name="rentabilidade" />
          </section>

        </div>
        <ul>
          {indicadores.map((item, i) => (
            <li className="lista-indicadores" key={i}>
              <p><span className="uppercase">{item.nome}</span> (ao ano)</p>
              <p name={item.nome}>{item.valor}%</p>
            </li>
          ))}
        </ul>

        <button className="reset-btn">Limpar campos</button>
        <button className="submit-btn">Simular</button>
      </form>

      <section className="resultado">
        <h2>Resultado da Simulação</h2>
      </section>
    </div>
  )
}