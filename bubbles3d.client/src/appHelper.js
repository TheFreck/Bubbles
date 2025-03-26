export const sideBounce = ({x,y,z,xVel,yVel,zVel,size},cb) => {
    if(x >= 100-size || x <= -100+size) {
        xVel *= -1;
    }
    if(y >= 100-size || y <= -100+size) {
        yVel *= -1;
    }
    if(z >= 100-size || z <= -100+size) {
        zVel *= -1;
    }
    cb({xVel,yVel,zVel});
}

export const collide = (a,b) => {
    let ar = a.size;
    let br = b.size;
    let ax = a.ref.current.position.x;
    let ay = a.ref.current.position.y;
    let az = a.ref.current.position.z;
    let axVel = a.xVel;
    let ayVel = a.yVel;
    let azVel = a.zVel;
    let aVel = Math.abs(axVel)+Math.abs(ayVel)+Math.abs(azVel);
    let bx = b.ref.current.position.x;
    let by = b.ref.current.position.y;
    let bz = b.ref.current.position.z;
    let bxVel = a.xVel;
    let byVel = a.yVel;
    let bzVel = a.zVel;
    let bVel = Math.abs(bxVel)+Math.abs(byVel)+Math.abs(bzVel);

    if(Math.abs(ax-bx)+Math.abs(ay-by)+Math.abs(az-bz) <= (ar+br)) {
        console.log("collide");
        let plane = findRadicalPlane({ax,ay,az,ar},{bx,by,bz,br});
        let apx = plane.x-axVel;
        let apy = plane.y-ayVel;
        let apz = plane.z-azVel;
        let bpx = (bxVel-plane.x);
        let bpy = (byVel-plane.y);
        let bpz = (bzVel-plane.z);
        
        let outcome = [{
            xVel: apx/Math.abs(apx+apy+apz)*aVel,
            yVel: apy/Math.abs(apx+apy+apz)*aVel,
            zVel: apz/Math.abs(apx+apy+apz)*aVel
        },{
            xVel: bpx/Math.abs(bpx+bpy+bpz)*bVel,
            yVel: bpy/Math.abs(bpx+bpy+bpz)*bVel,
            zVel: bpz/Math.abs(bpx+bpy+bpz)*bVel
        }];
        return outcome;
    }
    return [false,false];
}

const findRadicalPlane = ({ax,ay,az,ar},{bx,by,bz,br}) => {
    return {
        x: (ax-bx)*(ax-bx),
        y: (ay-by)*(ay-by),
        z: (az-bz)*(az-bz),
        r: (ar-br)*(ar-br)
    };
}

export default {
    sideBounce,
    collide
}