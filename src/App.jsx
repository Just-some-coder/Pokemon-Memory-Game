import "./App.css"
import {useEffect, useState} from "react";


function GameButton({handlePlay}){
    return (
        <div className={"gameArea"} onClick={handlePlay}>
            <img src="/src/assets/playButton.png"/>
        </div>
    );
}

function Footer({handleHowToPlay, handleLeaderBoard, handleClickSound, handleClickMake, clickSoundIcon, handleMusic, handleMusicMake, achievementList}) {
    return (
        <div className={"options"}>

            <div className={"soundOptions"}>
                <button>
                    <img src={!handleMusicMake ? '/src/assets/musical-note.png' : "/src/assets/211871_pause_icon.png"}
                         onClick={() => {
                             handleClickSound();
                             handleMusic();
                         }}/>
                </button>

                <button>
                    <img
                        src={clickSoundIcon ? "/src/assets/speaker-filled-audio-tool.png" : "/src/assets/9023983_speaker_simple_x_fill_icon.png"}
                        onClick={() => {
                            handleClickSound();
                            handleClickMake();
                        }}/>
                </button>
            </div>

            <div className={"achievements"}>
                <span>
                    <img src={achievementList[0] ? "/src/assets/easyYes.png" : "/src/assets/easyNo.png"} title="Pokemon Trainer"/>
                </span>

                <span>
                    <img src={achievementList[1] ? "/src/assets/mediumYes.png" : "/src/assets/mediumNo.png"} title="Pokemon Champion"/>
                </span>

                <span>
                    <img src={achievementList[2] ? "/src/assets/hardYes.png" : "/src/assets/hardNo.png"} title="Pokemon Professor"/>
                </span>

                <span>
                    <img src={achievementList[3] ? "/src/assets/masterYes.png" : "/src/assets/masterNo.png"} title="Pokemon Master"/>
                </span>


            </div>

            <div className={"gameplayOptions"}>
                <button>
                    <img src="/src/assets/5898866_competition_leaderboard_rank_ranking_icon.png" onClick={() => {
                        handleLeaderBoard();
                        handleClickSound();
                    }}/>
                </button>

                <button>
                    <img src="/src/assets/9042850_question_mark_icon.png" onClick={() => {
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
                    <img src="/src/assets/9110796_x_icon.png" onClick={()=>{
                        handleHowToPlay();
                        handleClickSound();
                    }}/>
                </div>

                <div className={"titleMark"}>
                    {/*<img src="/src/assets/question-sign.png"/>*/}
                    <h1>How To Play</h1>
                </div>

                <div className={"situationImage"}>
                    <img src="/src/assets/pikachu-thinking.png"/>
                </div>

                <div className={"howtoplayDescription"}>
                    <h1>Don&apos;t Click On the Same Card Twice</h1>
                    <h1>Keep On going To Score Higher Points</h1>
                </div>
            </div>
        </div>
    );
}

function LeaderBoards({handleLeaderBoard , handleClickSound}) {
    const [leaderboard, setLeaderboard] = useState([["Red", 10], ["Ash", 8], ["Misty", 6], ["Brock", 9]]);

    return (
        <div className={"background"}>
            <div className={"leaderboards"}>
                <div className={"closeButton"}>
                    <img src="/src/assets/9110796_x_icon.png" onClick={()=>{
                        handleLeaderBoard();
                        handleClickSound();
                    }}/>
                </div>
                <div className={"titleMark leaderboards-title"}>
                    <h1>LEADERBOARDS</h1>
                </div>

                <div className={"situationImage leaderboards-situation"}>
                    <img src="/src/assets/Angry-Pikachu-PNG-Image.png"/>
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
                        }).slice(0, 3).map((player) => {
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

function ChooseDifficulty({handleDifficulty}){
    return(
        <div className={"chooseDifficulty"}>
            <div className={"difficultyButtons"}>
                <button onClick={()=>{
                    handleDifficulty(2);
                }}><h1>Easy</h1></button>
                <button onClick={()=>{
                    handleDifficulty(3);
                }}><h1>Medium</h1></button>
                <button onClick={()=>{
                    handleDifficulty(4);
                }}><h1>Hard</h1></button>
            </div>
        </div>
    );
}

function Card({pokeID , onClick}){

    const [cardData, setCardData] = useState({
        name:"Bulbadaur",
        sprites:{
            other:{
                "official-artwork":{
                    front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
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
        <div className={"card"} onClick={()=>{
            onClick(pokeID);
        }}>
            <img src={cardData.sprites.other["official-artwork"].front_default}/>
            <h2>{cardData.name.toUpperCase()}</h2>
        </div>
    );
}

function Game({difficulty}) {

    const [onDeck, setOnDeck] = useState(Array.from({length: 151}, (_, i) => i + 1).sort(() => 0.5 - Math.random()).slice(0, 5));

    const [choosen, setChoosen] = useState([]);

    const [onHand, setOnHand] = useState([...onDeck].sort(() => Math.random() - 0.5));

    const handleCardSelect = (id) =>{

        if(choosen.includes(id)){
            setChoosen([]);
        }else{
            setChoosen([...choosen,id]);
        }

        setOnHand([...onHand].sort(() => Math.random() - 0.5))
    }

    return (
        <div className="deck">
            <div className={"score"}><h3>Score: {choosen.length}/{5}</h3></div>
            <div className={"cards"}>
                {onHand.map((card)=>{
                    return(
                        <Card pokeID={card} key={card} onClick = {handleCardSelect}/>
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
                    <GameButton handlePlay={handlePlay}/>
                </>
            );
        }else if(gameState === 1){
            return (
                <>
                    <ChooseDifficulty handleDifficulty = {handleDifficultyChoose}/>
                </>
            );
        }else if([2,3,4].includes(gameState)){
            return(
                <Game difficulty = {gameState}/>
            );
        }
    }

    const handlePlay = ()=>{
        setGameState(1);
    }

    const [playClickSound, setClickSound] = useState(true);
    const [playMusic, setPlayMusic] = useState(true);


    const handleClickSound = () =>{
        const audio = new Audio("/src/assets/pokemon-a-button.mp3");
        if(playClickSound) {
            setTimeout(() => {
                audio.play();
            }, 0);
            setTimeout(() => {
                audio.pause();
            }, 1000)
        }
    }

    const [musicAudio,setMusicAudio] = useState(new  Audio("/src/assets/backgroundMusic.mp3"));

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
        temp[num] = 1;
        setAchievementList(temp);
    }

    const handleDifficultyChoose = (num) =>{
        if(num===1){
            setGameState(2);
        }else if(num===2){
            setGameState(3);
        }else if(num === 3){
            setGameState(4);
        }
    }

    return (
        <>
            {/*<audio id={"clickSound"} src="/src/assets/pokemon-a-button.mp3"></audio>*/}
            <div className={"Header"}>
                <img src={"/src/assets/pokemon_Title.png"}/>
            </div>

            { howToPlayState && <HowToPlay handleHowToPlay={handleHowToPlay} handleClickSound={handleClickSound}/>}

            { leaderBoardState && <LeaderBoards handleLeaderBoard={handleLeaderBoard} handleClickSound={handleClickSound}/>}

            {handleGameState()}

            <Footer handleMusicMake = {playMusic} handleMusic={handleMusic} handleHowToPlay={handleHowToPlay} handleLeaderBoard={handleLeaderBoard} handleClickSound={handleClickSound} handleClickMake={handleClickMake} clickSoundIcon={playClickSound} achievementList = {achievementList}/>

        </>
    )
}