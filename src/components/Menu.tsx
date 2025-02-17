import React from "react";

interface MenuProps {
  setPlaying: (value: boolean) => void;
  setRules: (value: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ setPlaying, setRules }) => {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <button className="w-64 px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-lg hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200" 
      onClick={() => setPlaying(true)}>Start Game</button>
      <button className="w-64 px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-lg hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200" 
      onClick={() => setRules(true)}>View Rules</button>
    </div>
  );
};

export default Menu;