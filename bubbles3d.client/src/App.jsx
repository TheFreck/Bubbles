import { useEffect, useRef, useState } from 'react';
import Bubble from './Bubble/Bubble';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import {makeBubbles} from './Bubble/bubbleHelper';
import BubbleContainer from './BubbleContainer/BubbleContainer';

const App = () => {
    const bubbleCount = 20;
    const [bubbles,setBubbles] = useState([]);
    const [ready,setReady] = useState(false);

    useEffect(() => {
        makeBubbles(bubbleCount,bubs => {
            setBubbles(bubs);
            setReady(true);
        });
    },[]);

    const setRef = (ref,id) => {
        let bubble = bubbles.find(b => b.id === id);
        bubble.ref = ref;
    }

    return <div>
        <Canvas
            camera={{fov:75, near: .1, far: 1000, position: [100,0,0]}}
            style={{
                border: 'solid',
                width: "98vw",
                height: "98vh"
            }}
            shadows
        >
            <ambientLight intensity={.1} />
            <pointLight intensity={10000} position={[100,0,0]} color={"red"} />
            <pointLight intensity={10000} position={[-100,0,0]} color={"orange"} />
            <pointLight intensity={10000} position={[0,100,0]} color={"yellow"} />
            <pointLight intensity={10000} position={[0,-100,0]} color={"green"} />
            <pointLight intensity={10000} position={[0,0,100]} color={"blue"} />
            <pointLight intensity={10000} position={[0,0,-100]} color={"violet"} />
            <OrbitControls />
            {
                ready && bubbles &&
                <BubbleContainer
                    x={200}
                    y={200}
                    z={200}
                    color="green"
                    bubbles={bubbles}
                >
                    {
                        ready && bubbles && bubbles.map((b,i) => (
                            <Bubble
                                key={i}
                                id={b.id}
                                setRef={setRef}
                                color={b.color}
                                size={b.size}
                                position={b.position}
                            />
                        ))
                    }
                </BubbleContainer>
            }
        </Canvas>
            
    </div>
}

export default App;