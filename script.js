let userGuess = document.getElementById("stateInput");
let guessSubmit = document.getElementById("guessSubmit");
let fyi = document.getElementById("fyi");
let popRank = document.getElementById("popRank");
let ecoRank = document.getElementById("ecoRank");
let map = document.getElementById("map");
let guessesLeft = document.getElementById("guessesLeft");
let guessGrid = document.getElementById("guessGrid");
let giveUpButton = document.querySelector(".giveUpButton");
let weather = document.getElementById("weather");

let counter = 0;
let score = 0;
let guessedStates = []

// initialize the guess grid with 50 boxes representing states
function initializeGuessGrid() {
    for (let i = 0; i < 50; i++) {
        let guessBox = document.createElement('div');
        guessBox.classList.add(i);
        guessGrid.appendChild(guessBox);
    }
}

// end game conditions
function endGame() {
    guessesLeft.innerText = '0';
    guessSubmit.disabled = true;
    giveUpButton.disabled = true;
    popRank.innerText = ""
    ecoRank.innerText = ""
    weather.innerText = ""

    fyi.innerText = `Game Over! You got ${score}/50 states correct`;
}

// fetch and display weather for the guessed state
function displayWeather(state) {
    const apiKey = '61016cff089ae9e88bede2b0f275f010'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                weather.innerText = `Weather in ${state}: ${data.weather[0].description}, ${data.main.temp}°C`;
            } else {
                weather.innerText = "Weather information not available.";
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weather.innerText = "Weather information not available.";
        });
}

// the main function when form is submitted
function mainFunction(event) {
    event.preventDefault();  // prevent form submission which refreshed screen and erases states added
    
    if (guessedStates.includes(userGuess.value.toLowerCase())) {
        alert("You've already tried that. Please try another.");
        return;
    }

    guessedStates.push(userGuess.value.toLowerCase())

    counter++;

    let correct = false; // default state

    for (let i = 0; i < stateList.length; i++) {
        if (userGuess.value.toLowerCase() === stateList[i].state.toLowerCase().replace(/[<=>]/g, '')) {
            popRank.innerText = stateList[i].popRank;
            ecoRank.innerText = stateList[i].ecoRank;
            fyi.innerText = stateList[i].state.replace(/[<=>]/g, '');

            // display weather information
            displayWeather(stateList[i].state.replace(/[<=>]/g, ''));

            let addToMap = document.createElement('div');
            addToMap.innerText = stateList[i].state;
            addToMap.style.position = "absolute";
            addToMap.style.whiteSpace = "nowrap";
            addToMap.style.overflow = "visible"; // allows the text for the small states to go into the next div
            addToMap.style.left = stateList[i].left;
            addToMap.style.top = stateList[i].top;
            map.appendChild(addToMap);
            
            // ensures mapContainer allows overflow
            map.parentNode.style.overflow = "visible";

            userGuess.value = "";
            
            guessesLeft.innerText = 50 - counter;
            let guessBox = document.getElementsByClassName(`${counter - 1}`)[0];
            guessBox.style.backgroundColor = "green";

            score++;
            correct = true; 
            

            break;
        }
    }

    // if no correct match was found, mark the guess as incorrect
    if (!correct) {
        let guessBox = document.getElementsByClassName(`${counter - 1}`)[0];
        guessBox.style.backgroundColor = "red";
        userGuess.value = "";
    }

    if (counter === 50) {
        endGame();
    }
}

// event listeners
guessSubmit.addEventListener("click", mainFunction);
giveUpButton.addEventListener("click", endGame);

// initialize the game
initializeGuessGrid();

let stateList = [
    {
        state: "Alabama",
        left: "705px", 
        top: "510px",
        popRank: "24th (5 million)",
        ecoRank: "27th ($300 billion)",
    },
    {
        state: "Alaska",
        left: "175px", 
        top: "645px",
        popRank: "48th (700 thousand)",
        ecoRank: "48th ($67 billion)",
    },
    {
        state: "Arizona",
        left: "180px", 
        top: "440px",
        popRank: "14th (7 million)",
        ecoRank: "18th ($500 billion)",
    },
    {
        state: "Arkansas",
        left: "572px", 
        top: "458px",
        popRank: "33rd (3 million)",
        ecoRank: "34th ($180 billion)",
    },
    {
        state: "California",
        left: "20px",
        top: "360px",
        popRank: "1st (39 million)",
        ecoRank: "1st ($3.9 trillion)",
    },
    {
        state: "Colorado",
        left: "300px",
        top: "335px", 
        popRank: "21st (6 million)",
        ecoRank: "15th ($500 billion)",
    },
    {
        state: "<==Connecticut",
        left: "975px",
        top: "232px",
        popRank: "29th (4 million)",
        ecoRank: "23rd ($350 billion)",
    },
    {
        state: "<==Delaware",
        left: "940px",
        top: "308px",
        popRank: "45th (1 million)",
        ecoRank: "42nd ($94 billion)",
    },
    {
        state: "Florida",
        left: "840px",
        top: "605px",
        popRank: "3rd (23 million)",
        ecoRank: "4th ($1.6 trillion)",
    },
    {
        state: "Georgia",
        left: "785px", 
        top: "505px",
        popRank: "8th (11 million)",
        ecoRank: "8th ($800 billion)",
    },
    {
        state: "Hawaii",
        left: "30px", 
        top: "620px",
        popRank: "40th (1.4 million)",
        ecoRank: "40th ($108 billion)",
    },
    {
        state: "Idaho",
        left: "160px",
        top: "210px",
        popRank: "38th (2 million)",
        ecoRank: "38th ($119 billion)",
    },
    {
        state: "Illinois",
        left: "637px", 
        top: "320px",
        popRank: "6th (13 million)",
        ecoRank: "5th ($1.1 trillion)",
    },
    {
        state: "Indiana",
        left: "700px", 
        top: "310px", 
        popRank: "17th (7 million)",
        ecoRank: "19th ($500 billion)",
    },
    {
        state: "Iowa",
        left: "550px", 
        top: "270px",
        popRank: "31st (3 million)",
        ecoRank: "31st ($250 billion)",
    },
    {
        state: "Kansas",
        left: "460px", 
        top: "370px", 
        popRank: "34th (3 million)",
        ecoRank: "33rd ($230 billion)",
    },
    {
        state: "Kentucky",
        left: "703px", 
        top: "382px", 
        popRank: "26th (5 million)",
        ecoRank: "28th ($280 billion)",
    },
    {
        state: "Louisiana",
        left: "590px", 
        top: "570px", 
        popRank: "25th (5 million)",
        ecoRank: "26th ($300 billion)",
    },
    {
        state: "Maine",
        left: "1000px",
        top: "110px",
        popRank: "42nd (1.3 million)",
        ecoRank: "42nd ($67 billion)",
    },
    {
        state: "<==Maryland",
        left: "925px",
        top: "323px",
        popRank: "19th (6 million)",
        ecoRank: "15th ($450 billion)",
    },
    {
        state: "<==Massachusetts",
        left: "990px",
        top: "202px",
        popRank: "15th (7 million)",
        ecoRank: "10th ($600 billion)",
    },
    {
        state: "Michigan",
        left: "715px", 
        top: "235px", 
        popRank: "10th (10 million)",
        ecoRank: "14th ($500 billion)",
    },
    {
        state: "Minnesota",
        left: "527px", 
        top: "160px", 
        popRank: "22nd (6 million)",
        ecoRank: "17th ($450 billion)",
    },
    {
        state: "Mississippi",
        left: "630px", 
        top: "540px", 
        popRank: "34th (3 million)",
        ecoRank: "35th ($120 billion)",
    },
    {
        state: "Missouri",
        left: "570px", 
        top: "365px", 
        popRank: "18th (6 million)",
        ecoRank: "22nd ($350 billion)",
    },
    {
        state: "Montana",
        left: "278px",
        top: "130px",
        popRank: "44th (1 million)",
        ecoRank: "44th ($50 billion)",
    },
    {
        state: "Nebraska",
        left: "430px",
        top: "283px", 
        popRank: "37th (2 million)",
        ecoRank: "36th ($130 billion)",
    },
    {
        state: "Nevada",
        left: "100px",
        top: "280px",
        popRank: "32nd (3 million)",
        ecoRank: "32nd ($180 billion)",
    },
    {
        state: "<==New Hampshire",
        left: "987px",
        top: "185px",
        popRank: "41st (1.4 million)",
        ecoRank: "41st ($90 billion)",
    },
    {
        state: "<==New Jersey",
        left: "955px",
        top: "270px",
        popRank: "11th (9 million)",
        ecoRank: "8th ($700 billion)",
    },
    {
        state: "New Mexico",
        left: "270px", 
        top: "460px", 
        popRank: "36th (2 million)",
        ecoRank: "37th ($100 billion)",
    },
    {
        state: "New York",
        left: "880px", 
        top: "210px", 
        popRank: "4th (19 million)",
        ecoRank: "3rd ($1.9 trillion)",
    },
    {
        state: "North Carolina",
        left: "825px", 
        top: "410px", 
        popRank: "9th (10 million)",
        ecoRank: "11th ($600 billion)",
    },
    {
        state: "North Dakota",
        left: "410px", 
        top: "130px", 
        popRank: "47th (800 thousand)",
        ecoRank: "47th ($55 billion)",
    },
    {
        state: "Ohio",
        left: "773px", 
        top: "300px", 
        popRank: "7th (12 million)",
        ecoRank: "7th ($700 billion)",
    },
    {
        state: "Oklahoma",
        left: "465px", 
        top: "440px", 
        popRank: "28th (4 million)",
        ecoRank: "29th ($200 billion)",
    },
    {
        state: "Oregon",
        left: "50px",
        top: "170px",
        popRank: "27th (4 million)",
        ecoRank: "25th ($250 billion)",
    },
    {
        state: "Pennsylvania",
        left: "842px", 
        top: "265px", 
        popRank: "5th (13 million)",
        ecoRank: "6th ($800 billion)",
    },
    {
        state: "<==Rhode Island",
        left: "998px",
        top: "220px",
        popRank: "43rd (1 million)",
        ecoRank: "43rd ($60 billion)",
    },
    {
        state: "South Carolina",
        left: "810px",
        top: "450px",
        popRank: "23rd (5 million)",
        ecoRank: "26th ($300 billion)",
    },
    {
        state: "South Dakota",
        left: "410px", 
        top: "200px",
        popRank: "46th (900 thousand)",
        ecoRank: "46th ($55 billion)",
    },
    {
        state: "Tennessee",
        left: "700px", 
        top: "425px", 
        popRank: "16th (7 million)",
        ecoRank: "20th ($450 billion)",
    },
    {
        state: "Texas",
        left: "440px",
        top: "540px",
        popRank: "2nd (30 million)",
        ecoRank: "2nd ($2.1 trillion)",
    },
    {
        state: "Utah",
        left: "205px", 
        top: "320px",
        popRank: "30th (3 million)",
        ecoRank: "30th ($200 billion)",
    },
    {
        state: "<====Vermont",
        left: "963px",
        top: "160px",
        popRank: "49th (600 thousand)",
        ecoRank: "49th ($40 billion)",
    },
    {
        state: "Virginia",
        left: "860px",
        top: "367px", 
        popRank: "12th (9 million)",
        ecoRank: "12th ($600 billion)",
    },
    {
        state: "Washington",
        left: "70px",
        top: "70px",
        popRank: "13th (8 million)",
        ecoRank: "13th ($500 billion)",
    },
    {
        state: "West Virginia",
        left: "785px", 
        top: "347px", 
        popRank: "39th (1.8 million)",
        ecoRank: "39th ($70 billion)",
    },
    {
        state: "Wisconsin",
        left: "620px",
        top: "210px",
        popRank: "20th (6 million)",
        ecoRank: "21st ($400 billion)",
    },
    {
        state: "Wyoming",
        left: "285px", 
        top: "235px", 
        popRank: "50th (600 thousand)",
        ecoRank: "50th ($40 billion)",
    }
];


