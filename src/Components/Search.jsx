import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import List from "./List";
import "./Styles/Search.css";

function findMatchingProducts(clothesData, searchQuery) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerSearchQuery = searchQuery.toLowerCase();

      /*Filter the the products which contain search query*/
      const matchingProducts = clothesData.filter((element) =>
        element.toLowerCase().includes(lowerSearchQuery)
      );

      /*Matching Products sorted by earliest occurence of searchQuery
      if search query = "br"
      and matching product = ["windbreaker","briefcase"]
      then breiefcase comes before windbreaker since br occours at index 0 
      for briefcase while it occurs at index 4 in windbreaker
      */
      matchingProducts.sort((a, b) => {
        const indexA = a.toLowerCase().indexOf(lowerSearchQuery);
        const indexB = b.toLowerCase().indexOf(lowerSearchQuery);
        return indexA - indexB;
      });

      resolve(matchingProducts);
    }, 1000);
  });
}

const Search = ({ clothesData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    if (searchQuery === "") return;
    setLoading(true);
    const debounceTimeout = setTimeout(async () => {
      const matchingProducts = await findMatchingProducts(
        clothesData,
        searchQuery
      );
      setFilteredData(matchingProducts.slice(0, 5));
      setLoading(false);
    }, 400);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery, clothesData]);

  useEffect(() => {
    const handleClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const onInputChange = (e) => {
    setIsVisible(true);
    setFilteredData([]);
    setSearchQuery(e.target.value);
  };

  return (
    <div ref={divRef} className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={onInputChange}
        />
      </div>
      {isVisible && searchQuery && filteredData.length > 0 && (
        <List highLightText={searchQuery} data={filteredData} />
      )}
      {isVisible && searchQuery && loading && <div>Loading...</div>}
      {isVisible && searchQuery && !loading && filteredData.length === 0 && (
        <div>Product Not Found</div>
      )}
    </div>
  );
};

List.propTypes = {
  clothesData: PropTypes.array,
};
List.defaultProps = {
  clothesData: [],
};

export default Search;
