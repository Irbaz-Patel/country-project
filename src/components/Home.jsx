import React from "react";
import CountryCard from "./CountryCard";
import Header from "./Header";
import Search from "./Search";
import SelectMenu from "./SelectMenu";
import CountryListShimmer from "./CountryListShimmer";

const Home = ({ country, query, setQuery, theme }) => {
  return (
    <>
      <Header />
      <div className="search-filter-container">
        <Search query={query} setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      <div className="countries-container">
        {!country.length ? (
          <CountryListShimmer />
        ) : (
          country
            .filter((country) =>
              country.name.common.toLowerCase().includes(query.toLowerCase())
            )
            .map((countryItem, index) => (
              <CountryCard
                key={index}
                name={countryItem.name.common}
                flag={countryItem.flags.svg}
                population={countryItem.population}
                region={countryItem.region}
                capital={countryItem.capital ? countryItem.capital[0] : "N/A"}
              />
            ))
        )}
      </div>
    </>
  );
};

export default Home;
