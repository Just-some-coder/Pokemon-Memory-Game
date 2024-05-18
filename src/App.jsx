import "./App.css"
import {useState} from "react";


function GameButton({handlePlay}){
    return (
        <div className={"gameArea"} onClick={handlePlay}>
            <img src="/src/assets/playButton.png"/>
        </div>
    );
}

function Footer({handleHowToPlay, handleLeaderBoard}) {
    return (
        <div className={"options"}>

            <div className={"soundOptions"}>
                <button>
                    <img src='/src/assets/musical-note.png'/>
                </button>

                <button>
                    <img src="/src/assets/speaker-filled-audio-tool.png"/>
                </button>
            </div>

            <div className={"achievements"}>
                <span>
                    <img src="/src/assets/easy.png" title="Pokemon Trainer"/>
                </span>
                <span>
                    <img src="/src/assets/medium.png" title="Pokemon Champion"/>
                </span>
                <span>
                    <img src="/src/assets/hard.png" title="Pokemon Professor"/>
                </span>
                <span>
                    <img src="/src/assets/master.png" title="Pokemon Master"/>
                </span>

            </div>

            <div className={"gameplayOptions"}>
                <button>
                    <img src="/src/assets/5898866_competition_leaderboard_rank_ranking_icon.png" onClick={handleLeaderBoard}/>
                </button>

                <button>
                    <img src="/src/assets/9042850_question_mark_icon.png" onClick={handleHowToPlay}/>
                </button>
            </div>
        </div>
    );
}

function HowToPlay({handleHowToPlay}) {
    return (
        <div className={"background"}>
            <div className={"howtoplay"}>
                <div className={"closeButton"}>
                    <img src="/src/assets/9110796_x_icon.png" onClick={handleHowToPlay}/>
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

function LeaderBoards({handleLeaderBoard}) {
    const [leaderboard, setLeaderboard] = useState([["Red", 10], ["Ash", 8], ["Misty", 6], ["Brock", 9]]);

    return (
        <div className={"background"}>
            <div className={"leaderboards"}>
                <div className={"closeButton"}>
                    <img src="/src/assets/9110796_x_icon.png" onClick={handleLeaderBoard}/>
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

export default function Game() {

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
        }
    }

    const handlePlay = ()=>{
        setGameState(1);
    }



    return (
        <>
            <div className={"Header"}>
                <img src={"/src/assets/pokemon_Title.png"}/>
            </div>

            { howToPlayState && <HowToPlay handleHowToPlay={handleHowToPlay}/>}

            { leaderBoardState && <LeaderBoards handleLeaderBoard={handleLeaderBoard}/>}

            {handleGameState()}

            <Footer handleHowToPlay={handleHowToPlay} handleLeaderBoard={handleLeaderBoard}/>

        </>
    )
}