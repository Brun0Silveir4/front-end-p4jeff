import "./header.scss"
import { useEffect, useState } from "react";

import { CiTempHigh } from "react-icons/ci";

export default function Header(){
    const [home, setHome] = useState(true)
    
    const handleHome = (state) => {
        setHome(state)
    }

    return(
        <div className="header">
            <div className="title">
            <CiTempHigh size={24} color="#ff4500"/>
            <p>TempView</p>
            </div>

            <div className="nav">
                <p onClick={() => handleHome(true)} className={home == true ? "active" : ""}>Home</p>
                <p onClick={() => handleHome(true)} className={home == false ? "active" : ""}>About Us</p>
            </div>
        </div>
    )
}