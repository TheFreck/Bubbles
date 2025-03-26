import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { collide, sideBounce } from '../appHelper';

export const BubbleContainer = ({x,y,z,color,bubbles,children}) => {


    useFrame(() => {
        for(let i=0; i<bubbles.length; i++) {
            if(bubbles[i]?.ref?.current?.position){
                bubbles[i].ref.current.position.x += bubbles[i].xVel;
                bubbles[i].ref.current.position.y += bubbles[i].yVel;
                bubbles[i].ref.current.position.z += bubbles[i].zVel;
                sideBounce({
                    x:bubbles[i].ref.current.position.x,
                    y:bubbles[i].ref.current.position.y,
                    z:bubbles[i].ref.current.position.z,
                    xVel: bubbles[i].xVel,
                    yVel: bubbles[i].yVel,
                    zVel: bubbles[i].zVel,
                    size: bubbles[i].size
                },vel => {
                    bubbles[i].xVel = vel.xVel;
                    bubbles[i].yVel = vel.yVel;
                    bubbles[i].zVel = vel.zVel;
                });
                for(let j=0; j<i; j++) {
                    const [a,b] = collide(bubbles[i],bubbles[j]);
                    if(a && b){
                        bubbles[i].xVel = a.xVel;
                        bubbles[i].yVel = a.yVel;
                        bubbles[i].zVel = a.zVel;
                        bubbles[j].xVel = b.xVel;
                        bubbles[j].yVel = b.yVel;
                        bubbles[j].zVel = b.zVel;
                    }
                }
            }
        }
    });

    return (
        <mesh
            receiveShadow
            castShadow
        >
            <boxGeometry
                args={[x,y,z]}
                
            />
            <meshPhongMaterial
                color={color}
                side={THREE.BackSide}
            />
            {children}
        </mesh>
    )
}

export default BubbleContainer;