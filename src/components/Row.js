import React from "react";
import PropTypes from "prop-types";
import "./styles/Row.css"; // Add relevant styles

const Row = ({ children, isSplit }) => {
  return (
    <div className={`input-row ${isSplit ? "split" : "full"}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          className: isSplit ? "half-width" : "full-width",
        })
      )}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  isSplit: PropTypes.bool, // If true, the row is split into two columns
};

Row.defaultProps = {
  isSplit: false, // Defaults to full width
};

export default Row;
