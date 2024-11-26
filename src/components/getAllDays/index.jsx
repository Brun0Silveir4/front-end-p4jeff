import "./index.scss";
import data from "./teste.json";
import api from "../../api/api";
import Loading from "@carbon/react/lib/components/Loading";

import { CiTempHigh } from "react-icons/ci";
import { FaCloudSun } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GetAllDays() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDates = async () => {
    setLoading(true);
    await api.get("/getAllData").then((response) => {
      setLoading(false);
      setDates(response.data);
    });
  };

  const test = (date) => {
    const teste = date.split("/");
    const day = teste[0];
    const month = teste[1];
    const year = teste[2];
    return `/specificDay/${day}/${month}/${year}`;
  };

  useEffect(() => {
    getDates();
    console.log(dates);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="card-group">
            {dates &&
              dates.map((doc, i) => {
                const dateUrl = test(doc.date);
                return (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={dateUrl}
                    key={i}
                  >
                    <div  className="card-item">
                      <div className="header-card">
                        <p>{doc.date}</p>

                        <CiTempHigh
                          size={23}
                          color={doc.temp > 24.0 ? "#ff4500" : "#3333FF"}
                        />
                      </div>
                      <div className="footer-card">
                        <div className="temp">
                          <p>{doc.temp}°</p>
                          <FaCloudSun size={22} />
                        </div>
                        <div className="hmd">
                          <p>{doc.hmd}%</p>
                          <WiHumidity size={24} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
