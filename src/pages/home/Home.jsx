import GetAllDays from "../../components/getAllDays";
import Header from "../../components/header/header";
import "./home.scss";
import { useState } from "react";

export default function Home() {

    const [selected, setSelected] = useState(true)

    const handleSelected = (select) => {
        setSelected(select)
    }



  return (
    <>
      <div className="container">
      <Header />
        <div className="main-content">
          <div className="title">
            <p>Monitoramento de temperaturas</p>
          </div>

          <div className="filters">
            <div className="filters-title">
                <p>Selecione o filtro desejado:</p>
            </div>
            
            <div className="filters-group">
                <p onClick={() => handleSelected(true)} className={selected == true ? "selected" : ""}>Verificar por dias</p>
                <p onClick={() => handleSelected(false)} className={selected == false ? "selected" : ""}>Verificar por meses</p>
            </div>
          </div>

        {selected ? (
            <GetAllDays />
        ) : ''}


        </div>

      </div>
    </>
  );
}
