import React, { useEffect, useState } from "react";

const Card = ({ name, flag }) => (
  <div
    className="countryCard text-center border p-2"
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
      cursor: "pointer",
    }}>
    <img src={flag} alt={`Flag of ${name}`} style={{ width: "75px" }} />
    <p>{name}</p>
  </div>
);

export default function CountrySearch() {
  const API = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setCountries)
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCountries = countries.filter(({ common }) =>
    common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container text-center mt-3">
      <div className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control w-50 mt-2 mb-3"
          aria-label="Search"
        />
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
        {filteredCountries.map(({ common, png }) => (
          <Card key={common} name={common} flag={png} />
        ))}
      </div>
    </div>
  );
}
