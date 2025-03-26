export const makeBubbles = (qty,cb) => {
    const bubs = [];
    const size = 5;
    for(let i=-qty/2+1; i<qty/2; i++) {
        bubs.push({
            id: i,
            ref: {},
            color: "white",
            size,
            position: [2*i*size,2*i*size,2*i*size],
            xVel: Math.random()*2-1,
            yVel: Math.random()*2-1,
            zVel: Math.random()*2-1
        });
    }
    // bubs.push({
    //     id: 0,
    //     ref: {},
    //     color: "white",
    //     size: 5,
    //     position: [0,-2,-10],
    //     xVel: 0,
    //     yVel: 0,
    //     zVel: .75
    // });
    // bubs.push({
    //     id: 1,
    //     ref: {},
    //     color: "white",
    //     size: 5,
    //     position: [0,2,10],
    //     xVel: 0,
    //     yVel: 0,
    //     zVel: -.75
    // });
    cb(bubs);
}

const positionBubbles = (bubs) => {
    console.log("positioning");
    let looking;
    let x;
    let y;
    let z;
    do{
        looking = false;
        x = Math.random()*10;
        y = Math.random()*10;
        z = Math.random()*10;
        for(let bub of bubs) {
            if(x-bub.position[0] < bub.size && y-bub.position[1] < bub.size && z-bub.position[2] < bub.size) {
                looking = true;
                break;
            }
        }
    }
    while(looking);
    return [x,y,z];
}

export default {
    makeBubbles
}