import "./index.scss"
import data from "./teste.json"
import api from "../../api/api";

import { CiTempHigh } from "react-icons/ci";
import { FaCloudSun } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { useEffect, useState } from "react";

export default function GetAllDays(){
const [dates, setDates] = useState([])

const getDates = async () => {
    await api.get("/getAllData").then((response) => setDates(response.data))
}

useEffect(() => {
    getDates()
    console.log(dates)
}, [])

    return(

        <div className="card-group">
            
        { dates &&
        dates.map((doc, i) => (
            <div key={i} className="card-item">
                <div className="header-card">
                    <p>{doc.date}</p>

                    <CiTempHigh size={23} color={doc.temp > 24.00 ? "#ff4500" : "#3333FF"}/>
                </div>
                <div className="footer-card">
                    <div className="temp">
                        <p>{doc.temp}°</p>
                        <FaCloudSun size={22}/>
                    </div>
                    <div className="hmd">
                        <p>{doc.hmd}%</p>
                        <WiHumidity size={24}/>
                    </div>
                </div>
            </div>
        ))}
        

        </div>

    )
}