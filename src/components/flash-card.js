import React from 'react';
import PT from 'prop-types';
import {Entity} from 'aframe-react';

function FlashCard ({pos, img}) {


    function mouseEnter (e) {
        console.log('mouse enter', e.detail.intersection)
        e.target.emit('zoomIn')
    }
    
    function mouseLeave (e) {
        console.log('mouse leave', pos, e.detail.intersection)
        e.target.emit('zoomOut')
    }

    let cardFlipped = false;

    function mouseClick (e) {
        console.log('mouse click', e.detail.intersection)
        cardFlipped ? e.target.emit('flipBack') : e.target.emit('flipOver')
        cardFlipped = !cardFlipped
    }

    return (
        <Entity
            geometry={{primitive: 'plane', width: 1.4, height: 1.4}}
            material={{opacity: 0}}
            position={pos}
            events={{mousedown: mouseClick, click: mouseEnter, mouseleave: mouseLeave}}>
            <a-animation attribute="position"
                begin='zoomIn'
                dur="200"
                to={`${pos.x} ${pos.y} ${pos.z +0.18}`}></a-animation>
            <a-animation attribute="position"
                begin='zoomOut'
                dur="200"
                to={`${pos.x} ${pos.y} ${pos.z}`}></a-animation>
            <a-animation attribute="rotation"
                begin='flipOver'
                dur="500"
                from="0 0 0"
                to="0 180 0"></a-animation>
            <a-animation attribute="rotation"
                begin='flipBack'
                dur="500"
                from="0 180 0"
                to="0 360 0"></a-animation>
            <Entity
                geometry={{primitive: 'plane', width: 1.4, height: 1.4}}
                material={{src: '#cardboard'}}
                position={{x: 0, y: 0, z: -0.01}}>
            </Entity>
            <Entity
                geometry={{primitive: 'plane', width: 1.4, height: 1.4}}
                material={{src: img}}
                position={{x: 0, y: 0, z: -0.01}}
                rotation="0 180 0">
            </Entity>
        </Entity>
    );
}

FlashCard.propTypes = {
    pos: PT.object.isRequired
}

export default FlashCard;