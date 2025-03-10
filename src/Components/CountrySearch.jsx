import React, { useEffect, useState } from "react";

const Card = ({ name, flag }) => {
  return (
    <div
      className="countryCard"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "150px",
        width: "150px",
        border: "1px solid",
        borderRadius: "5px",
      }}>
      <img
        src={flag}
        alt={`Flag of ${name}`}
        className="flag"
        style={{
          width: "75px",
        }}
      />
      <h6>{name}</h6>
    </div>
  );
};

export default function CountrySearch() {
  const API = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <input
        type="search"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        className="form-control"
        aria-label="Search"
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}>
        {filteredCountries.map(({ common, png }) => (
          <Card key={common} name={common} flag={png} />
        ))}
      </div>
    </div>
  );
}
