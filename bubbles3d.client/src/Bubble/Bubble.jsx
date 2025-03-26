import React, { useEffect, useRef } from "react";

export const Bubble = ({setRef,position,color,size,id}) => {
    const ref = useRef();
    useEffect(() => {
        setRef(ref,id);
    },[ref]);

    return <mesh
        ref={ref}
        position={position}
        receiveShadow
        castShadow
    >
        <sphereGeometry
            args={[size,50,50]}
        />
        <meshPhongMaterial
            color={color}
        />
    </mesh>
}

export default Bubble;