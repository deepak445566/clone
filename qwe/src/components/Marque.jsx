import React from "react";
import Marquee from "react-fast-marquee";

function Marque() {
  return (
   <Marquee
  gradient={false}
  speed={200}
  className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 py-3"
>
  <span className="text-white text-2xl font-semibold tracking-widest uppercase drop-shadow-lg ">
    DESPA CLASSES || DESPA CLASSES || DESPA CLASSES || DESPA CLASSES  DESPA CLASSES || DESPA CLASSES || DESPA CLASSES || DESPA CLASSES  DESPA CLASSES || DESPA CLASSES || DESPA CLASSES || DESPA CLASSES 
  </span>
</Marquee>

  );
}

export default Marque;
