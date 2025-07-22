import React, { useState } from 'react';

const Portion = ({ port = [] }) => {
  const [active, setActive] = useState('');

  if (!port.length) return null;

  return (
    <div className="flex gap-[1px]">
      {port.map((elem, index) => (
        <span
          key={index}
          onClick={() => setActive(elem.portion_type_name)}
          className={`text-xl font-bold px-3 py-1 rounded cursor-pointer transition-all duration-300 ${
            active === elem.portion_type_name
              ? 'bg-[#BD1619] text-white border border-[#BD1619]'
              : 'text-[#BD1619]'
          }`}
        >
          {elem.portion_type_name}
        </span>
      ))}
    </div>
  );
};

export default Portion;
