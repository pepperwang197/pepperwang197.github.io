const validLetters = new Set(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"])


fetch("./words.json")
    .then((response) => response.json())
    .then((json) => {
        const wordList = json;
        const validInputWords = new Set(wordList)
        const validCorrectWords = wordList.slice(0, 3000)

        const correctWord = validCorrectWords[Math.floor(Math.random()*3000)].toUpperCase().split("")
        const correctWordSet = new Set(correctWord)

        const wordLen = 5;
        const guessCount = 6;

        for(let i=0; i<guessCount; i++){
            const guessdiv = document.createElement("div")
            guessdiv.id = "guess"+i
            guessdiv.className = "guess"
            document.getElementById("guesses").appendChild(guessdiv)
            for(let j=0; j<wordLen; j++){
                const letter = document.createElement("div")
                letter.innerHTML = " "
                letter.id = "letter"+i+j
                letter.className = "letter"
                document.getElementById("guess"+i).appendChild(letter)
            }
        }

        let currentGuess = 0;
        let currentLetter = 0;
        let currentGuessString = ""

        function checkWord(){
            let numCorrect = 0
            for(let i=0; i<wordLen; i++){
                let inputLetter = document.getElementById("letter"+currentGuess+i).innerText
                if(inputLetter === correctWord[i]){
                    document.getElementById("letter"+currentGuess+i).classList.add("green")
                    numCorrect++
                } else if(correctWordSet.has(inputLetter)){
                    document.getElementById("letter"+currentGuess+i).classList.add("yellow")
                } else {
                    document.getElementById("letter"+currentGuess+i).classList.add("black")
                }
            }
            if(numCorrect==5){
                return true
            }
            return false
        }

        function winGame(){
            document.getElementById("winlose").innerHTML = "YIPPEEEEE!!!!!"
        }

        function loseGame(){
            document.getElementById("winlose").innerHTML = "you SUCK!!!!!!!!!!!!! the correct word was " + correctWord.join("")
        }

        document.addEventListener('keydown', function(event) {
            const key = event.key;
            if(key === "Backspace" || key === "Delete") {
                if(currentLetter>0){
                    currentLetter--
                    currentGuessString = currentGuessString.slice(0,currentLetter)
                    document.getElementById("letter"+currentGuess+currentLetter).innerText = ""
                }
            } else if(key === "Enter"){
                if(currentLetter===5 && validInputWords.has(currentGuessString)){
                    if(checkWord()){
                        winGame()
                    } else if(currentGuess==5) {
                        loseGame()
                    } else{
                        currentGuess++
                        currentLetter=0
                        currentGuessString=""
                    }
                }
            } else if(validLetters.has(key)) {
                if(currentLetter<wordLen){
                    document.getElementById("letter"+currentGuess+currentLetter).innerText = key.toUpperCase()
                    currentGuessString += key
                    currentLetter++
                }
            }

        })
    });
