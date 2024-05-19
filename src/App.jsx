import "./App.css"
import {useDebugValue, useEffect, useState} from "react";


function GameButton({handlePlay, handleClickSound}){
    return (
        <div className={"gameArea"} onClick={handlePlay}>
            <img src="../assets/playButton.png" onClick={handleClickSound}/>
        </div>
    );
}

function Footer({handleHowToPlay, handleLeaderBoard, handleClickSound, handleClickMake, clickSoundIcon, handleMusic, handleMusicMake, achievementList}) {
    return (
        <div className={"options"}>

            <div className={"soundOptions"}>
                <button>
                    <img src={!handleMusicMake ? '../assets/musical-note.png' : "../assets/211871_pause_icon.png"}
                         onClick={() => {
                             handleClickSound();
                             handleMusic();
                         }}/>
                </button>

                <button>
                    <img
                        src={clickSoundIcon ? "../assets/speaker-filled-audio-tool.png" : "../assets/9023983_speaker_simple_x_fill_icon.png"}
                        onClick={() => {
                            handleClickSound();
                            handleClickMake();
                        }}/>
                </button>
            </div>

            <div className={"achievements"}>
                <span>
                    <img src={achievementList[0] ? "../assets/easyYes.png" : "../assets/easyNo.png"} title="Pokemon Trainer"/>
                </span>

                <span>
                    <img src={achievementList[1] ? "../assets/mediumYes.png" : "../assets/mediumNo.png"} title="Pokemon Champion"/>
                </span>

                <span>
                    <img src={achievementList[2] ? "../assets/hardYes.png" : "../assets/hardNo.png"} title="Pokemon Professor"/>
                </span>

                <span>
                    <img src={achievementList[3] ? "../assets/masterYes.png" : "../assets/masterNo.png"} title="Pokemon Master"/>
                </span>


            </div>

            <div className={"gameplayOptions"}>
                <button>
                    <img src="../assets/5898866_competition_leaderboard_rank_ranking_icon.png" onClick={() => {
                        handleLeaderBoard();
                        handleClickSound();
                    }}/>
                </button>

                <button>
                    <img src="../assets/question-sign.png" onClick={() => {
                        handleHowToPlay();
                        handleClickSound();
                    }}/>
                </button>
            </div>
        </div>
    );
}

function HowToPlay({handleHowToPlay, handleClickSound}) {
    return (
        <div className={"background"}>
            <div className={"howtoplay"}>
                <div className={"closeButton"}>
                    <img src="../assets/9110796_x_icon.png" onClick={()=>{
                        handleHowToPlay();
                        handleClickSound();
                    }}/>
                </div>

                <div className={"titleMark"}>
                    {/*<img src="../assets/question-sign.png"/>*/}
                    <h1>How To Play</h1>
                </div>

                <div className={"situationImage"}>
                    <img src="../assets/pikachu-thinking.png"/>
                </div>

                <div className={"howtoplayDescription"}>
                    <h1>Don&apos;t Click On the Same Card Twice</h1>
                    <h1>Keep On going To Score Higher Points</h1>
                </div>
            </div>
        </div>
    );
}

function LeaderBoards({handleLeaderBoard , handleClickSound, leaderboard}) {

    return (
        <div className={"background"}>
            <div className={"leaderboards"}>
                <div className={"closeButton"}>
                    <img src="../assets/9110796_x_icon.png" onClick={()=>{
                        handleLeaderBoard();
                        handleClickSound();
                    }}/>
                </div>
                <div className={"titleMark leaderboards-title"}>
                    <h1>LEADERBOARDS</h1>
                </div>

                <div className={"situationImage leaderboards-situation"}>
                    <img src="../assets/Angry-Pikachu-PNG-Image.png"/>
                </div>

                <div className="leaderboard-table">
                    <table>
                        <tr>
                            <td>
                                <h2>Name</h2>
                            </td>
                            <td>
                                <h2>Score</h2>
                            </td>
                        </tr>

                        {leaderboard.sort((a, b) => {
                            return b[1] - a[1]
                        }).slice(0,3).map((player) => {
                            return (
                                <tr>
                                    <td>
                                        <h3>{player[0]}</h3>
                                    </td>
                                    <td>
                                        <h3>{player[1]}</h3>
                                    </td>
                                </tr>
                            );
                        })
                        }

                    </table>
                </div>
            </div>
        </div>
    );
}

function ChooseDifficulty({handleDifficulty ,handleClickSound}){
    return(
        <div className={"chooseDifficulty"}>
            <div className={"difficultyButtons"}>
                <button onClick={()=>{
                    handleDifficulty(2)
                    handleClickSound();
                }}><h1>Easy</h1></button>
                <button onClick={()=>{
                    handleDifficulty(3)
                    handleClickSound();
                }}><h1>Medium</h1></button>
                <button onClick={()=>{
                    handleDifficulty(4)
                    handleClickSound();
                }}><h1>Hard</h1></button>
            </div>
        </div>
    );
}

function Card({pokeID , onClick, handleClickSound, flipCard , cardFlip, scoreChange}){

    const [cardData, setCardData] = useState({
        name:"Loading....",
        sprites:{
            other:{
                "official-artwork":{
                    front_default:"../assets/playButton.png"
                }
            }
        }
    })

    const [api, setApi] = useState("https://pokeapi.co/api/v2/pokemon/" + pokeID)



    useEffect(()=>{
        fetch(api)
            .then((data)=>{
                return data.json()
            })
            .then((data)=>{
                setCardData(data);
            })
    },[pokeID,api])



    return(
        <div className={`card ${cardFlip?"flipped":""}`} onClick={()=>{
            scoreChange();
            onClick(pokeID)
            handleClickSound();
            flipCard();
        }}>
            <div className={cardFlip?"none":"card-front"}>
                <img src={cardData.sprites.other["official-artwork"].front_default}/>
                <h2>{cardData.name.toUpperCase()}</h2>
            </div>

            <div className={"card-back"}>
                <img src={"../assets/card-back.png"} style={cardFlip?{height:"350px"}:{display:"none"}}/>
            </div>
        </div>
    );
}

function GameWin(){
    return(
        <div className={"background"}>
            <div className={"gameWin"}>
                <h1>YOU WIN !!</h1>
                <img src="../assets/pikachu-happy.gif"/>
            </div>
        </div>
    );
}

function GameLose(){
    return(
        <div className={"background"}>
            <div className={"gameLose"}>
                <h1>Wrong Choice</h1>
                <img src="../assets/wrong-pikachu.gif"/>
            </div>
        </div>
    );
}

function GameOver({score, handleAddToLeaderBoard,goBack}) {

    const [playerName, setPlayerName] = useState("");

    const handleNameChange = (event) => {
        const name = event.target.value;
        setPlayerName(name);
    }

    return (
        <div className={"background"}>
            <div className={"gameWin"}>
                <h1>Game Over</h1>
                <img src="../assets/nodding-crossed-arms.gif" id="gameOver"/>

                <div className={"info"}>
                    <input name={"name"} value={playerName} placeholder={"Name"} onChange={handleNameChange}/>
                    <button onClick={() => {
                        handleAddToLeaderBoard(playerName, score);
                        goBack(0);
                    }}>Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

function Game({difficulty ,goBack , giveAchievement, handleClickSound, handleAddScore}) {

    const [deckSize, setDeckSize] = useState(()=>{
        if(difficulty === 2){
            return 5;
        }else if(difficulty === 3){
            return 10;
        }else if(difficulty === 4){
            return 151;
        }

    })

    const [onDeck, setOnDeck] = useState(Array.from({length: 151}, (_, i) => i + 1).sort(() => 0.5 - Math.random()).slice(0, deckSize));

    const [choosen, setChoosen] = useState([]);

    const [onHand, setOnHand] = useState([...onDeck].slice(0,deckSize).sort(() => Math.random() - 0.5));

    const [gameWin, setGameWin] = useState(false);

    const [gameLose, setGameLose] = useState(false);

    const [score, setScore] = useState(choosen.length);

    const handleScoreChange = () =>{
        setScore(choosen.length);
    }
    const handleCardSelect = (id) =>{


        if(choosen.includes(id)){
            if(difficulty === 4){
                setGameOver(true);
                giveAchievement(2);
            }
            setGameLose(true);
            setTimeout(()=>{
                setGameLose(false);
            },1500)
            setChoosen([]);
        }else{
            setChoosen([...choosen,id]);
            if(choosen.length + 1 === deckSize){
                setGameWin(true);
                setTimeout(()=>{
                    setGameWin(false);
                    goBack(0);
                    giveAchievement(difficulty-2);
                },2000)
            }
        }
        let temp = [...onHand].sort(() => Math.random() - 0.5);
        while(temp===onHand){
           temp = [...onHand].sort(() => Math.random() - 0.5);
        }
        setOnHand(temp);
    }

    const [cardFlipped, setCardFlipped] = useState(false);

    const [gameOver, setGameOver] = useState(false);

    const flipCard = () =>{
        setCardFlipped(!cardFlipped);
        setTimeout(()=>{
            setCardFlipped(false);
        },1000)
    }

    return (
        <div className="deck">
            {gameWin && <GameWin/>}
            {gameLose && <GameLose/>}
            {gameOver && <GameOver score={score} handleAddToLeaderBoard={handleAddScore} goBack={goBack}/>}
            <div className={"score"}><h3><img src="../assets/playButton.png"/> SCORE : {choosen.length}/{deckSize} </h3></div>
            <div className={"cards"}>
                {onHand.slice(0,5).map((card)=>{
                    return(
                        <Card pokeID={card} key={card} onClick = {handleCardSelect} handleClickSound={handleClickSound} flipCard={flipCard} cardFlip={cardFlipped} scoreChange={handleScoreChange}/>
                    );
                })}
            </div>
        </div>
    );
}

export default function HomePage() {

    const [gameState, setGameState] = useState(0);

    const [howToPlayState, setHowToPlayState] = useState(false);

    const [leaderBoardState, setLeaderBoardState] = useState(false);

    const handleHowToPlay = () => {
        setHowToPlayState(!howToPlayState);
    }

    const handleLeaderBoard = () => {
        setLeaderBoardState(!leaderBoardState);
    }
    const handleGameState = () => {
        if (gameState === 0) {
            return (
                <>
                    <GameButton handlePlay={handlePlay} handleClickSound={handleClickSound}/>
                </>
            );
        }else if(gameState === 1){
            return (
                <>
                    <ChooseDifficulty handleDifficulty = {handleDifficultyChoose} handleClickSound={handleClickSound}/>
                </>
            );
        }else if([2,3,4].includes(gameState)){
            return(
                <Game difficulty = {gameState} goBack = {setGameState} giveAchievement={gainAchievement} handleClickSound={handleClickSound} handleAddScore={handleAddScore}/>
            );
        }
    }

    const handlePlay = ()=>{
        setGameState(1);
    }

    const [playClickSound, setClickSound] = useState(true);
    const [playMusic, setPlayMusic] = useState(true);


    const handleClickSound = () => {
        const audio = new Audio("../assets/pokemon-a-button.mp3");
        if (playClickSound) {
            setTimeout(() => {
                audio.play();
            })
        }
    }

    const [musicAudio,setMusicAudio] = useState(new  Audio("../assets/backgroundMusic.mp3"));

    const handleMusic = () =>{

        if(playMusic) {
            musicAudio.play();
        }else{
            musicAudio.pause();
        }

        setPlayMusic(!playMusic);


    }

    const handleClickMake = () =>{
        setClickSound(!playClickSound);
    }

    const [achievementList, setAchievementList] = useState([0,0,0,0]);

    const gainAchievement = (num) =>{
        let temp = [...achievementList];
        if(num === 2){
            const newL = leaderboard.sort((a, b) => {
                return b[1] - a[1]
            })

            console.log(newL[0][0])

            if((["Misty","Red","Ash","Brock"].includes(newL[0][0]))){
                temp[2] = 1;
                if(temp[0] === 1 && temp[1] === 1 && temp[2] === 1){
                    temp[3] = 1;
                }
                setAchievementList(temp);
                return;
            }else{
                return;
            }
        }
        temp[num] = 1;
        if(temp[0] === 1 && temp[1] === 1 && temp[2] === 1){
            temp[3] = 1;
        }
        setAchievementList(temp);
    }

    const handleDifficultyChoose = (num) =>{
        if(num===2){
            setGameState(2);
        }else if(num===3){
            setGameState(3);
        }else if(num === 4){
            setGameState(4);
        }
    }

    const [leaderboard, setLeaderboard] = useState([["Red", 5], ["Ash", 3], ["Misty", 2], ["Brock", 1]]);

    const handleAddScore = (name,score) =>{
        const temp = [...leaderboard];
        temp.push([name,score]);
        // console.log([name,score]);
        setLeaderboard(temp);
    }

    return (
        <>
            {/*<audio id={"clickSound"} src="../assets/pokemon-a-button.mp3"></audio>*/}
            <div className={"Header"}>
                <img src={"../assets/pokemon_Title.png"} onClick={()=>{
                    if([0,1].includes(gameState)){
                        setGameState(0);
                    }else if([2,3,4].includes(gameState)){
                        setGameState(1);
                    }
                    handleClickSound();
                }}/>
            </div>

            { howToPlayState && <HowToPlay handleHowToPlay={handleHowToPlay} handleClickSound={handleClickSound}/>}

            { leaderBoardState && <LeaderBoards handleLeaderBoard={handleLeaderBoard} handleClickSound={handleClickSound} leaderboard={leaderboard}/>}

            {handleGameState()}

            <Footer handleMusicMake = {playMusic} handleMusic={handleMusic} handleHowToPlay={handleHowToPlay} handleLeaderBoard={handleLeaderBoard} handleClickSound={handleClickSound} handleClickMake={handleClickMake} clickSoundIcon={playClickSound} achievementList = {achievementList}/>

        </>
    )
}