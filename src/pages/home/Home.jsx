import GetAllDays from "../../components/getAllDays";
import Header from "../../components/header/header";
import GetSpecificMonth from "../../components/getSpecificMonth";
import "./home.scss";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState(true);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [filters, setFilters] = useState({ month: "", year: "" });
  const [showComponent, setShowComponent] = useState(false);

  const handleSelected = (select) => {
    setSelected(select);
    setMonth("");
    setYear("");
    setFilters({ month: "", year: "" });
  };

  const handleClick = () => {
    setFilters({ month, year });
    setShowComponent(false);
    setTimeout(() => {
      setShowComponent(true);
    }, 0);
  };

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
              <p
                onClick={() => handleSelected(true)}
                className={selected === true ? "selected" : ""}
              >
                All Items
              </p>
              <p
                onClick={() => handleSelected(false)}
                className={selected === false ? "selected" : ""}
              >
                Item per month
              </p>
            </div>
          </div>

          {selected ? (
            <GetAllDays />
          ) : (
            <div className="input-search">
              <div className="input-group">
                <input
                  type="number"
                  placeholder="insira o mês desejado..."
                  value={month}
                  onChange={(ev) => setMonth(ev.target.value)}
                />
                <input
                  type="number"
                  placeholder="insira o ano desejado..."
                  value={year}
                  onChange={(ev) => setYear(ev.target.value)}
                />
              </div>
              <button onClick={handleClick}>Buscar</button>

              {showComponent && filters.month && filters.year && (
                <GetSpecificMonth
                  key={`${filters.month}-${filters.year}`}
                  month={filters.month}
                  year={filters.year}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
