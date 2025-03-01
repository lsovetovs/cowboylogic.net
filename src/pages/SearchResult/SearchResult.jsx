import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`https://api.example.com/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching search results:", error));
  }, [query]);

  return (
    <div>
      <h2>Search Results for {query}</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
