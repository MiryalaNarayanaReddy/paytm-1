
import React from "react";

function WraperCard({ title, children }) {
  return (
    <div className="bg-blue-200 p-4 rounded-lg border-4 border-gray-300 w-96 mx-auto mt-20">

      <h1 className="text-2xl font-bold text-center">{title}</h1>

      <div className="mt-4">
        {children}

      </div>
    </div>
  );
}

function InputCard({ title, type, placeholder, value, onChange }) {
  return (

    <div className="mt-4">

      <div className="flex justify-between">
        
        <div className="text-lg font-bold p-2">
          {title}
        </div>

        <div>
          <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full p-2 border-2 border-gray-300 rounded-lg" />
        
        </div>
      </div>

    </div>
  );
}


function ButtonCard({ title, onClick }) {
  return (
    <div className="text-center">
      <button onClick={onClick} className=" p-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition duration-500">
      {title}
      </button>
    </div>
  );
}


export { WraperCard, InputCard, ButtonCard };