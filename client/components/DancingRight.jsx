import React from 'react'
import axolotl from '../imgs/axolotl.gif';
import ostrich from '../imgs/quack-quack-dance.gif';
import lightning from '../imgs/lightning.png';
import singleNote from '../imgs/single-note.png';
import dualNote from '../imgs/dual-note.png';

// Description: Component to show dancing right GIF
const DancingRight = (props) => {


    return(
        <div className="dancing-right-div">
            <div className="notes-div">
                <img className="note blast-left" src={singleNote}></img>
                <img className="note blast-right" src={dualNote}></img>
            </div>
            <div className="axolotl-div">
                    <img className="axolotl" src={axolotl}></img>
                </div>
        </div>
    )
}

export default DancingRight;