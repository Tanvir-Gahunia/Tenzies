import React from "react"
import ReactDOM from 'react-dom'
//import Jokes from "./components/Jokes"

import "./index.css"


function Box(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }
    return (
        <div className="die-face" style={styles} onClick={props.change_func}>
            <h2 className="die-num">{props.num}</h2>
        </div>
    )
}



function App() {


    function newdice() {
        let newdie=[]
        for(let i = 0; i < 10; ++i) {
            let value = Math.ceil(Math.random() * 6)
            newdie.push({num: value,
                        isHeld: false,
                        id: i})
        }

        return newdie
    }


    let [dice, setdice] = React.useState(newdice())
    let [win, setwin] = React.useState(false)

    React.useEffect(() => {
        for (let i = 1; i < dice.length; ++i) {
            if (dice[i].isHeld === false || dice[i-1].isHeld === false || dice[i].num !== dice[i-1].num) {
                return;
            }
        }
        setwin(true);
    }, [dice])

    let boxes = dice.map(item => (
        <Box num={item.num} isHeld={item.isHeld} change_func={() => change(item.id)}/>
    ))

    function change(id) {
        setdice(prevData => prevData.map(item => {
            return item.id === id ? 
                {...item, isHeld: !item.isHeld} : 
                item
            }))
    }

    function handleclick() {
        if(win) {
            setwin(false);
            setdice(newdice());
            return;
        }

        setdice(prevData => prevData.map(item => {
            return item.isHeld ? 
                   item :
                   {...item, num: Math.ceil(Math.random() * 6)}
        }))
    }


    return (
        <main>
            <div className="grid">
                {boxes}
            </div>
            <button className = "btn" onClick={handleclick}>{win ? "New Game" : "Roll"}</button>
        </main>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />)

