import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CountryDetailsShimmer from "./CountryDetailsShimmer";
import Error from "./Error";
import Header from "./Header";

const CardDetails = () => {
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [countryBorder, setCountryBorder] = useState([]);
  const { countryName } = useParams();

  const fetchCountry = async () => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      if (!res.ok) throw new Error("Failed to fetch country details");
      const data = await res.json();
      setCountryData(data);

      if (data[0]?.borders?.length) {
        const borderPromises = data[0].borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([data]) => data.name.common);
        });
        const borderNames = await Promise.all(borderPromises);
        setCountryBorder(borderNames);
      }
    } catch (e) {
      setNotFound(true);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [countryName]);

  if (notFound) {
    return <Error message="Country not found. Please check the URL." />;
  }

  if (!countryData) {
    return <CountryDetailsShimmer />;
  }

  const {
    flags,
    population,
    region,
    capital,
    name,
    subregion,
    tld,
    currencies,
    languages,
    nativeName,
    borders,
  } = countryData[0];

  return (
    <main>
      <Header />
      {!countryData.length ? (
        <CountryDetailsShimmer />
      ) : (
        <div className="country-details-container">
          <span className="back-button" onClick={() => history.back()}>
            <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
          </span>
          <div className="country-details">
            <img src={flags.svg} alt={`${name.common} flag`} />
            <div className="details-text-container">
              <h1>{name.common}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: {nativeName || name.common}</b>
                  <span className="native-name"></span>
                </p>
                <p>
                  <b>Population: {population.toLocaleString("en-IN")}</b>
                  <span className="population"></span>
                </p>
                <p>
                  <b>Region: {region}</b>
                  <span className="region"></span>
                </p>
                <p>
                  <b>Sub Region: {subregion ? subregion : "N/A"}</b>
                  <span className="sub-region"></span>
                </p>
                <p>
                  <b>
                    Capital:{" "}
                    {countryData.capital
                      ? countryData.capital.join(", ")
                      : "N/A"}
                  </b>
                  <span className="capital"></span>
                </p>
                <p>
                  <b>Top Level Domain: {tld ? tld.join(", ") : "N/A"}</b>
                  <span className="top-level-domain"></span>
                </p>
                <p>
                  <b>
                    Currencies:{" "}
                    {currencies
                      ? Object.values(currencies)
                          .map((currency) => currency.name)
                          .join(", ")
                      : "N/A"}
                  </b>
                  <span className="currencies"></span>
                </p>
                <p>
                  <b>
                    Languages:{" "}
                    {languages ? Object.values(languages).join(", ") : "N/A"}
                  </b>
                  <span className="languages"></span>
                </p>
              </div>
              {countryBorder && countryBorder.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>
                  {countryBorder.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CardDetails;
