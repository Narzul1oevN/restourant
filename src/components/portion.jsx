// src/components/portion.jsx
import React from 'react';

const Portion = ({ portions = [], activePortionId, onSelectPortion }) => {

  if (!portions.length) return null;

  return (
    <div className="flex gap-[5px]"> {/* Increased gap slightly */}
      {portions.map((elem) => (
        <span
          key={elem.id} // Use elem.id for key
          onClick={() => onSelectPortion(elem)} // Call onSelectPortion with the element
          className={`portion-button ${ // New class
            activePortionId === elem.id ? 'active' : ''
          }`}
        >
          {elem.portion_type_name}
        </span>
      ))}
    </div>
  );
};

export default Portion;