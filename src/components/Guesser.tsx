import {useEffect, useState} from "react";
import React from 'react';
import Papa from 'papaparse'
import useSpeechRecognition from '../hooks/useSpeechRecognitionHook.ts';

const StrategyChartCSV = './blackjackStrategyChart.csv';
const SplitChartCSV = './splitStrategyChart.csv';

const pokerDeck = [
    {id : 1, name: "A", value: 1, nameString: "Ace", aceOptionalValue: 11},
    {id : 2, name: "2", value: 2, nameString: "Two"},
    {id : 3, name: "3", value: 3, nameString: "Three"},
    {id : 4, name: "4", value: 4, nameString: "Four"},
    {id : 5, name: "5", value: 5, nameString: "Five"},
    {id : 6, name: "6", value: 6, nameString: "Six"},
    {id : 7, name: "7", value: 7, nameString: "Seven"},
    {id : 8, name: "8", value: 8, nameString: "Eight"},
    {id : 9, name: "9", value: 9, nameString: "Nine"},
    {id : 10, name: "10", value: 10, nameString: "Ten"},
    {id : 11, name: "J", value: 10, nameString: "Jack"},
    {id : 12, name: "Q", value: 10, nameString: "Queen"},
    {id : 13, name: "K", value: 10, nameString: "King"}
]

const Guesser = (props) => {
    const {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

    const [voiceInputInfo, setVoiceInputInfo] = useState(null);

    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [dealerCard, setDealerCard] = useState(null);
    const [playerHand, setPlayerHand] = useState("");
    const [playerHandSoft, setPlayerHandSoft] = useState(null);
    const [strategyChart, setStrategyChart] = useState([]);
    const [splitChart, setSplitChart] = useState([]);
    const [strategyChartRow, setStrategyChartRow] = useState("");
    const [strategyChartSplitRow, setStrategyChartSplitRow] = useState("");
    const [strategyChartColumn, setStrategyChartColumn] = useState("");
    const [decision, setDecision] = useState("");

    useEffect(() => {
        setVoiceInputInfo("");
        let words = text.split(" ");
        let firstCardName;
        let secondCardName;
        let dealerCardName;
        if(words.length === 1){
            firstCardName = words[0].charAt(0);
            secondCardName = words[0].charAt(1);
            dealerCardName = words[0].charAt(2);
        }
        else if(words.length !== 3){
            setVoiceInputInfo("Sorry but there was a mistake in the voice input. Please say the cards in the format 'FirstCard SecondCard DealerCard'");
            return;
        }
        else if (words.length === 3){
            firstCardName = words[0];
            secondCardName = words[1];
            dealerCardName = words[2];
        }

        let firstCardFound = pokerDeck.find((card) => (card.name === firstCardName || card.nameString.toLowerCase() === firstCardName.toLowerCase()));
        let secondCardFound = pokerDeck.find((card) => (card.name === secondCardName || card.nameString.toLowerCase() === secondCardName.toLowerCase()));
        let dealerCardFound = pokerDeck.find((card) => (card.name === dealerCardName || card.nameString.toLowerCase() === dealerCardName.toLowerCase()));

        if(firstCardFound && secondCardFound && dealerCardFound){
            setFirstCard(firstCardFound);
            setSecondCard(secondCardFound);
            setDealerCard(dealerCardFound);
        }
        else{
            setVoiceInputInfo("Sorry but there was a mistake in the voice input. Please say the cards in the format 'FirstCard SecondCard DealerCard'");
        }
    }, [text]);

    useEffect(() => {
        const fetchStrategyData= async () => { // async so it doesn't block the main thread
            const response = await fetch(StrategyChartCSV); // fetch the data await so it waits for the data to be fetched
            const reader = response.body.getReader(); // to create a readable stream
            const result = await reader.read(); // read the stream
            const decoder = new TextDecoder('utf-8'); // decoder instance
            const csv = decoder.decode(result.value);  // decode the stream
            const parsedData = Papa.parse(csv, { // parse the csv into a json object
                header: true, // use the first row as headers
                skipEmptyLines: true // skip empty lines
            }).data;
            setStrategyChart(parsedData); // set the state with the parsed data
        }
        const fetchSplitData = async () => { // async so it doesn't block the main thread
            const response = await fetch(SplitChartCSV); // fetch the data await so it waits for the data to be fetched
            const reader = response.body.getReader(); // to create a readable stream
            const result = await reader.read(); // read the stream
            const decoder = new TextDecoder('utf-8'); // decoder instance
            const csv = decoder.decode(result.value);  // decode the stream
            const parsedData = Papa.parse(csv, { // parse the csv into a json object
                header: true, // use the first row as headers
                skipEmptyLines: true // skip empty lines
            }).data;
            setSplitChart(parsedData); // set the state with the parsed data
        }
        fetchStrategyData();
        fetchSplitData();
    }, []);

    useEffect(() => {
        setPlayerHandSoft(null);
        setStrategyChartSplitRow(null);
        if (firstCard && secondCard) {
            if(firstCard.value === 1 && secondCard.value === 1) {
                setPlayerHand(firstCard.value + secondCard.aceOptionalValue);
                setDecision("Split");
            }
            else if(firstCard.value === 1 || secondCard.value === 1) {
                if(firstCard.value ===1){
                    if(secondCard.value === 10){
                        setDecision("Blackjack!");
                    }else{
                        setStrategyChartRow(("A"+secondCard.value).toString());
                    }
                }else{
                    if(firstCard.value === 10){
                        setDecision("Blackjack!");
                    }else{
                        setStrategyChartRow(("A"+firstCard.value).toString());
                    }
                }
                setPlayerHand(firstCard.value + secondCard.value);
                setPlayerHandSoft(firstCard.value + secondCard.value + 10);
            }
            else{
                if(firstCard === secondCard){
                    if(firstCard.value === 10){
                        setStrategyChartSplitRow("T,T")
                    }
                    else{
                        setStrategyChartSplitRow((firstCard.value.toString() + "," +firstCard.value.toString()).toString());
                    }
                }
                setPlayerHand(firstCard.value + secondCard.value);
                setStrategyChartRow((firstCard.value + secondCard.value).toString());
            }
        }
    }, [firstCard, secondCard]);

    useEffect(() => {
        if(dealerCard){
            if(dealerCard.value === 1){
                setStrategyChartColumn("A");
            }else{
                setStrategyChartColumn(dealerCard.value.toString());
            }
        }

    }, [dealerCard]);


    useEffect(() => {
        if (strategyChartRow && strategyChartColumn && strategyChart.length > 0) {
            console.log("Looking up:", strategyChartRow, strategyChartColumn);
    
            // Find the row in the parsed strategy chart
            const bjrow = strategyChart.find((r) => r["Hand"] === strategyChartRow);
    
            if (!bjrow) {
                console.warn("No matching row found for", strategyChartRow);
                return;
            }
    
            // Ensure the dealer's column value is a string for lookup
            const columnKey = strategyChartColumn.toString();
    
            if (!(columnKey in bjrow)) {
                console.warn("Column key not found:", columnKey);
                return;
            }
            const decisionletter = bjrow[columnKey]; // Lookup the correct column
            
            console.log("Decision:", decisionletter);
            let previousDecision;
            switch (decisionletter) {
                case "H":
                    setDecision("Hit");
                    previousDecision="Hit";
                    break;
                case "S":
                    setDecision("Stand");
                    previousDecision="Stand";
                    break;
                case "D":
                    setDecision("Double if allowed, otherwise hit");
                    previousDecision="Double if allowed, otherwise hit";
                    break;
                case "Ds":
                    setDecision("Double if allowed, otherwise stand");
                    previousDecision="Double if allowed, otherwise stand";
                    break;
                default:
                    break;
            }

            if(strategyChartSplitRow){
                const splitrow = splitChart.find((r) => r["Hand"] === strategyChartSplitRow);

                if (!splitrow) {
                    console.warn("No matching row found for", strategyChartSplitRow);
                    return;
                }

                const conlumnKeySplit = strategyChartColumn.toString();
                if(!(conlumnKeySplit in splitrow)){
                    console.warn("Column key not found:", conlumnKeySplit);
                    return;
                }
                const decisionSplit = splitrow[conlumnKeySplit];
                if(decisionSplit === "Y")
                {
                    setDecision("Split");
                }else if (decisionSplit === "Y/N"){
                    console.log(decision);
  
                    setDecision(previousDecision + " or Split if you can double down after splitting");
                }

            }
        }
    }, [strategyChartRow, strategyChartColumn]);

    useEffect(() => {
        console.log(decision);
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(decision));
    }, [decision]);


    return (
        <div className="relative max-w-4xl mx-auto p-6 text-white">
            <div className="absolute top-1 left-2">
                <button
                    onClick={() => props.setPlaying(false)}
                    className="w-10 h-10 rounded-lg bg-red-600 hover:bg-red-500 flex items-center justify-center text-white font-bold transition-colors duration-200"
                >
                    ×
                </button>
            </div>

            <div className="space-y-3">
                {hasRecognitionSupport ? (
                    <div className="space-y-2">
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={startListening}
                                disabled={isListening}
                                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                Start Listening
                            </button>
                            <button
                                onClick={stopListening}
                                disabled={!isListening}
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-lg hover:from-red-500 hover:to-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                Stop Listening
                            </button>
                        </div>
                        {isListening && (
                            <div className="text-center text-yellow-400 font-medium">
                                Your browser is currently listening to your voice
                            </div>
                        )}
                        <div className="text-center text-gray-300">{text}</div>
                        {voiceInputInfo && text !== "" && !isListening && (
                            <div className="text-center text-red-400">{voiceInputInfo}</div>
                        )}
                    </div>
                ) : (
                    <h2 className="text-center text-red-400 text-xl">
                        Sorry, your browser does not support speech recognition
                    </h2>
                )}


                <div className="space-y-3">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center text-white">Enter the first card</h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {pokerDeck.map((card) => (
                                <button
                                    key={card.id}
                                    onClick={() => setFirstCard(card)}
                                    className="w-8 h-10 bg-red-700 hover:bg-red-600 rounded-lg font-bold transition-colors duration-200"
                                >
                                    {card.name}
                                </button>
                            ))}
                        </div>
                        <h3 className="text-center text-gray-300">
                            Selected first card: <span className="text-yellow-400">{firstCard?.name || "None"}</span>
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center text-white">Enter the second card</h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {pokerDeck.map((card) => (
                                <button
                                    key={card.id + 13}
                                    onClick={() => setSecondCard(card)}
                                    className="w-8 h-10 bg-red-700 hover:bg-red-600 rounded-lg font-bold transition-colors duration-200"
                                >
                                    {card.name}
                                </button>
                            ))}
                        </div>
                        <h3 className="text-center text-gray-300">
                            Selected second card: <span className="text-yellow-400">{secondCard?.name || "None"}</span>
                        </h3>
                    </div>



                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-center text-white">Enter the dealer's card</h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {pokerDeck.map((card) => (
                                <button
                                    key={card.id + 26}
                                    onClick={() => setDealerCard(card)}
                                    className="w-8 h-10 bg-red-700 hover:bg-red-600 rounded-lg font-bold transition-colors duration-200"
                                >
                                    {card.name}
                                </button>
                            ))}
                        </div>
                        <h3 className="text-center text-gray-300">
                            Selected dealer's card: <span className="text-yellow-400">{dealerCard?.name || "None"}</span>
                        </h3>
                    </div>
                    <h3 className="text-center text-xl text-yellow-400">
                        You have: {playerHand} {playerHandSoft}
                    </h3>
                    <div className="mt-8 text-center">
                        <h3 className="text-2xl font-bold">
                            Decision: <span className="text-yellow-400">{decision}</span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guesser;