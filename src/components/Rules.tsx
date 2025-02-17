import React from 'react';

const Rules = ({ setRules }) => {
  return (
    <div className="relative max-w-7xl mx-auto p-3 text-white">
      <div className="absolute top-1 left-2">
        <button
          onClick={() => setRules(false)}
          className="w-10 h-10 rounded-lg bg-red-600 hover:bg-red-500 flex items-center justify-center text-white font-bold transition-colors duration-200"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 ">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-red-500">IMPORTANT!</h2>
          <p className="text-gray-300 leading-relaxed">
            I assume you already know how to play blackjack so I'll explain how BlackJackHelper works.
          </p>
          <p className="text-gray-300 leading-relaxed">
            With the help of BlackJackHelper you will know what the best course of action is considering your two initial cards and the dealer's card.
          </p>
          <p className="text-gray-300 leading-relaxed">This decisions are for a table with 4/6/8 Decks</p>
          <p className="text-gray-300 leading-relaxed">
            BlackJackHelper will tell you if you should hit, stand, double down or split considering your probability to win.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Be advised that even though the suggested course of action maximizes your winning probability it doesn't guarantee you will win.
          </p>
        </div>

        <div className="space-y-1 ">
          <h2 className="text-2xl font-bold text-red-500">How to use BlackJackHelper</h2>
          <h3 className="text-xl font-semibold text-white">There are two ways to input the cards</h3>
          
          <div className="rounded-lg p-4 space-y-1">
            <h4 className="text-lg font-semibold text-yellow-400">Pressing the buttons</h4>
            <p className="text-gray-300">
              To do so just click on the button that corresponds to your cards and the dealer's shown card
            </p>
          </div>

          <div className=" rounded-lg  space-y-1">
            <h4 className="text-lg font-semibold text-yellow-400">Speaking</h4>
            <p className="text-gray-300">
              Click on the start listening button and say your cards in the following way: yourFirstCard yourSecondCard dealersCard
            </p>
            <div className="space-y-1 text-gray-300">
              <p>As must be pronounced as Ace</p>
              <p>Ks must be pronounced as Kings</p>
              <p>Qs must be pronounced as Queens</p>
              <p>Js must be pronounced as Jack</p>
              <p className="italic">For example: Ace King 5</p>
            </div>
          </div>
        </div>

        <div className="pt-4 text-center space-y-4">
          <p className="text-2xl font-bold text-yellow-500">Good luck!</p>
          <button
            onClick={() => setRules(false)}
            className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-500 transform hover:scale-105 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rules;