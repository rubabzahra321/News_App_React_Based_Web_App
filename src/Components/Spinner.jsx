import React from 'react';
import gif from './gif.gif';

const Spinner = () => {
  return (
    <div className="text-center">
      <img
        src={gif}
        alt="loading"
        className="img-fluid"
        style={{ width: "80px", height: "80px" }}
      />
    </div>
  );
};

export default Spinner;
