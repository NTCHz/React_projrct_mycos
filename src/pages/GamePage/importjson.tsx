import React from "react";
import data from "./data/data.json";

const DataDisplay: React.FC = () => {
  return (
    <div>
      <h1>Data from CSV</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Name: {item.name}, Age: {item.age}, City: {item.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
