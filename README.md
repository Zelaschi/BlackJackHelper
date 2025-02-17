# BlackJackHelper

## Live demo
https://zelaschi.github.io/BlackJackHelper/ 

## Description
BlackjackHelper is an aplication that advises users on how to play their blackjack hands, including speech recognition. It analyzes both the player's and dealer's hands and provides advise based on preloaded strategy charts from a CSV to suggest the best course of action. 

## Characteristics
<ul>
    <li>Voice recognition to input player's and dealer's hands</li>
    <li>CSV-based strategy chart loading</li>
    <li>Voice synthesis for feedback</li>
</ul>

## Technologies

<ul>
    <li>React.js</li>
    <li>Tailwind CSS</li>
    <li>Papaparse for CSV file parsing</li>
    <li>Web Speech API for speech recognition</li>
    <li>Web Speech API for voice synthesis</li>
</ul>

## Instalation
1. Clone the repository
    ```sh
    git clone https://github.com/Zelaschi/BlackJackHelper.git
    cd blackjack-helper
    ```
2. Install dependencies
    ```sh
    npm install
    ```
3. Start application</li>
    ```sh
    npm start
    ```

## Known Issues
<ul>
    <li>After saying "King," "Jack," or "Queen," numbers like "two" are sometimes recognized as "to," and "four" as "for".</li>
    <li>If "King," "Jack," or "Queen" is spoken first, the next number may be recognized as a two-digit number, causing incorrect detection of the suggestion.</li>
    <li>No firefox support</li>
</ul>

## Future Improvements
<ul>
    <li>Track the card count and update the probability array according to the count</li>
</ul>
