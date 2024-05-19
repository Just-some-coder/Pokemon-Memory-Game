import "./App.css"
import playButton from './assets/playButton.png'
import musical_note from '../assets/musical-note.png'
import pause_icon from '../assets/211871_pause_icon.png'
import speaker_filled from "../assets/speaker-filled-audio-tool.png"
import speakerX_filled from "../assets/9023983_speaker_simple_x_fill_icon.png"
import easyYes from "../assets/easyYes.png"
import easyNo from "../assets/easyNo.png"
import mediumYes from "../assets/mediumYes.png"
import mediumNo from "../assets/mediumNo.png"
import hardYes from "../assets/hardYes.png"
import hardNo from "../assets/hardNo.png"
import masterYes from "../assets/masterYes.png"
import masterNo from "../assets/masterNo.png"
import leaderBoardIcon from "../assets/5898866_competition_leaderboard_rank_ranking_icon.png"
import questionSign from "../assets/question-sign.png"
import {useDebugValue, useEffect, useState} from "react";
import x_icon from "../assets/9110796_x_icon.png"
import pikachuThinking from "../assets/pikachu-thinking.png"
import angryPikachu from "../assets/Angry-Pikachu-PNG-Image.png"
import cardBack from "../assets/card-back.png"
import pikachuHappy from "../assets/pikachu-happy.gif"
import wrongPikachu from "../assets/wrong-pikachu.gif"
import nodPikachu from "../assets/nodding-crossed-arms.gif"
import clickSound from "../assets/pokemon-a-button.mp3"
import bgMusic from "../assets/backgroundMusic.mp3"
import pokemonTitle from "../assets/pokemon_Title.png"


function GameButton({handlePlay, handleClickSound}){
    return (
        <div className={"gameArea"} onClick={handlePlay}>
            <img src={playButton} onClick={handleClickSound}/>
        </div>
    );
}

function Footer({handleHowToPlay, handleLeaderBoard, handleClickSound, handleClickMake, clickSoundIcon, handleMusic, handleMusicMake, achievementList}) {
    return (
        <div className={"options"}>

            <div className={"soundOptions"}>
                <button>
                    <img src={!handleMusicMake ? musical_note : pause_icon}
                         onClick={() => {
                             handleClickSound();
                             handleMusic();
                         }}/>
                </button>

                <button>
                    <img
                        src={clickSoundIcon ?  speaker_filled:speakerX_filled }
                        onClick={() => {
                            handleClickSound();
                            handleClickMake();
                        }}/>
                </button>
            </div>

            <div className={"achievements"}>
                <span>
                    <img src={achievementList[0] ? easyYes : easyNo} title="Pokemon Trainer"/>
                </span>

                <span>
                    <img src={achievementList[1] ? mediumYes : mediumNo} title="Pokemon Champion"/>
                </span>

                <span>
                    <img src={achievementList[2] ? hardYes : hardNo } title="Pokemon Professor"/>
                </span>

                <span>
                    <img src={achievementList[3] ?  masterYes: masterNo } title="Pokemon Master"/>
                </span>


            </div>

            <div className={"gameplayOptions"}>
                <button>
                    <img src={leaderBoardIcon} onClick={() => {
                        handleLeaderBoard();
                        handleClickSound();
                    }}/>
                </button>

                <button>
                    <img src={questionSign} onClick={() => {
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
                    <img src={x_icon} onClick={()=>{
                        handleHowToPlay();
                        handleClickSound();
                    }}/>
                </div>

                <div className={"titleMark"}>
                    {/*<img src="../assets/question-sign.png"/>*/}
                    <h1>How To Play</h1>
                </div>

                <div className={"situationImage"}>
                    <img src={pikachuThinking}/>
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
                    <img src={x_icon} onClick={()=>{
                        handleLeaderBoard();
                        handleClickSound();
                    }}/>
                </div>
                <div className={"titleMark leaderboards-title"}>
                    <h1>LEADERBOARDS</h1>
                </div>

                <div className={"situationImage leaderboards-situation"}>
                    <img src={angryPikachu}/>
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
                    front_default:playButton
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
                <img src={cardBack} style={cardFlip?{height:"350px"}:{display:"none"}}/>
            </div>
        </div>
    );
}

function GameWin(){
    return(
        <div className={"background"}>
            <div className={"gameWin"}>
                <h1>YOU WIN !!</h1>
                <img src={pikachuHappy}/>
            </div>
        </div>
    );
}

function GameLose(){
    return(
        <div className={"background"}>
            <div className={"gameLose"}>
                <h1>Wrong Choice</h1>
                <img src={wrongPikachu}/>
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
                <img src={nodPikachu} id="gameOver"/>

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
            <div className={"score"}><h3><img src={playButton}/> SCORE : {choosen.length}/{deckSize} </h3></div>
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
        const audio = new Audio(clickSound);
        if (playClickSound) {
            setTimeout(() => {
                audio.play();
            })
        }
    }

    const [musicAudio,setMusicAudio] = useState(new  Audio(bgMusic));

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
                <img src={pokemonTitle} onClick={()=>{
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