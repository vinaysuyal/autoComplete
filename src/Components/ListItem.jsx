import React from "react";
import "./Styles/ListItem.css";
import PropTypes from "prop-types";

const ListItem = ({ highLightText, item }) => {
  return (
    <li>
      {item
        .toLowerCase()
        .split(highLightText.toLowerCase())
        .map((element, index) => {
          if (index === 0)
            return <span key={Math.random() * 100000}>{element}</span>;
          else
            return (
              <span key={Math.random() * 100000}>
                <span className="highlighted">{highLightText}</span>
                <span>{element}</span>
              </span>
            );
        })}
    </li>
  );
};

ListItem.propTypes = {
  highLightText: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};

export default ListItem;
