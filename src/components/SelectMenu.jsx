import React from "react";

const SelectMenu = ({setQuery}) => {
  return (
    <select className="filter-by-region" onChange={(e)=>setQuery(e.target.value.toLowerCase())}>
      <option value="">Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Taiwan">Taiwan</option>
      <option value="Macau">Macau</option>
      <option value="IceLand">IceLand</option>
    </select>
  );
};

export default SelectMenu;
