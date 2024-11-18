import React from "react";

export default function NavAirbnb() {
  return (
    <div>
      <div className="flex space-x-3 font-medium">
        <button className="text-md hover:bg-slate-100 p-2 px-3 rounded-3xl transition opacity-60 hover:opacity-100">
          Chỗ ở
        </button>
        <button className="text-md  hover:bg-slate-100 p-2 px-3 rounded-3xl transition opacity-60 hover:opacity-100">
          Trải nghiệm
        </button>
      </div>
    </div>
  );
}
