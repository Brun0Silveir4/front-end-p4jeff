import "./header.scss";
import { useEffect, useState } from "react";

import { CiTempHigh } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link
        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
        to="/"
      >
        <div className="title">
          <CiTempHigh size={24} color="#ff4500" />
          <p>TempView</p>
        </div>
      </Link>
    </div>
  );
}
