import "./App.css"
import {useState} from "react";


function GameButton({handlePlay}){
    return (
        <div className={"gameArea"} onClick={handlePlay}>
            <img src="/src/assets/playButton.png"/>
        </div>
    );
}

function Footer({handleHowToPlay}) {
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
                    <img src="/src/assets/5898866_competition_leaderboard_rank_ranking_icon.png"/>
                </button>

                <button>
                    <img src="/src/assets/9042850_question_mark_icon.png" onClick={handleHowToPlay}/>
                </button>
            </div>
        </div>
    );
}

function HowToPlay({handleHowToPlay}){
    return(
        <div className={"howtoplay"}>
            <div className={"closeButton"}>
                <img src="/src/assets/9110796_x_icon.png" onClick={handleHowToPlay}/>
            </div>

            <div className={"titleMark"}>
                <img src="/src/assets/question-sign.png"/>
            </div>

            <div className={"situationImage"}>
                <img src="/src/assets/Screen_Shot_2018-10-25_at_11.02.15_AM.jpg"/>
            </div>

            <div className={"howtoplayDescription"}>
                <p><strong>Start by selecting a difficulty level. Choose Pokémon cards from the grid, remembering your picks. Avoid duplicates to conquer your memory quest!</strong></p>
            </div>
        </div>
    );
}

export default function Game() {

    const [gameState, setGameState] = useState(0);

    const [howToPlayState, setHowToPlayState] = useState(false);

    const handleHowToPlay = () =>{
        setHowToPlayState(!howToPlayState);
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

            {handleGameState()}

            <Footer handleHowToPlay={handleHowToPlay}/>


        </>
    )
}