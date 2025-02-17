import {useEffect, useState } from "react";

let grammar = "#JSGF V1.0; grammar cards; public <card> = Ace | King | Queen | Jack | Two | Three | Four | Five | Six | Seven | Eight | Nine | Ten | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 ;";

let recognition: any = null;
let speechRecognitionList: any = null;
if("webkitSpeechRecognition" in window) {
    recognition = new (window as any).webkitSpeechRecognition(); //fix typescript error
    recognition.continuous = true; //multiple results
    recognition.lang = "en-US";
    speechRecognitionList =new (window as any).webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
}

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if(!recognition) return; //if browser does not support speech recognition

        recognition.onresult= (event: SpeechSynthesisEvent) => {
            setText(event.results[0][0].transcript);
            recognition.stop();
            setIsListening(false);
        }
    }, [])

    const startListening = () => {
        setText('')
        setIsListening(true);
        recognition.start();
    }

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    }

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    }
};



export default useSpeechRecognition;