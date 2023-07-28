import React from "react";
import ListItem from "./ListItem";
import "./Styles/List.css";
import PropTypes from "prop-types";

const List = ({ data, highLightText }) => {
  return (
    <ul className="list-container">
      {data.map((item, index) => (
        <ListItem highLightText={highLightText} key={index} item={item} />
      ))}
    </ul>
  );
};
List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  highLightText: PropTypes.string,
};
List.defaultProps = {
  highLightText: "",
};

export default List;
