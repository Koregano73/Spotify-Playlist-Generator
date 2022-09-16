import React from 'react'
import axolotl from '../imgs/axolotl.gif';
import ostrich from '../imgs/quack-quack-dance.gif';
import lightning from '../imgs/lightning.png';
import singleNote from '../imgs/single-note.png';
import dualNote from '../imgs/dual-note.png';
// Description: Component to show dancing left GIF
const DancingLeft = (props) => {


    return(
        <div className="dancing-left-div">
            <div className="lightning-div">
                <img id="lightning-left" className="lightning flip-horizontally" src={lightning}></img>
                <img id="lightning-right" className ="lightning" src={lightning}></img>
            </div>
            <div className="ostrich-div">
                <img id="duck" className="ostrich flip-horizontally" src={ostrich}></img>
            </div>
        </div>
    )
}

export default DancingLeft;