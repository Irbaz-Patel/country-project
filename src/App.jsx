import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CardDetails from "./components/CardDetails";
import Error from "./components/Error";
import useTheme, { ThemeContext } from "./components/custom/Theme";

function App() {
  const [country, setCountry] = useState([]);
  const [query, setQuery] = useState("");
  const { isDark } = useContext(ThemeContext);

  const fetchCountry = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    try {
      if (!res.ok) {
        throw new Error("Failed to fetch countries.");
      }
      const data = await res.json();
      setCountry(data);
    } catch (e) {
      console.error("Error fetching countries:", e);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  // if (notFound) return <Error message="Country not found. Please check the URL." />;

  return (
    <>
      <main className={isDark ? "dark" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <Home country={country} query={query} setQuery={setQuery} />
            }
          />
          <Route path="/:countryName" element={<CardDetails />} />
          <Route path="*" element={<Error message="Page not found!" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
