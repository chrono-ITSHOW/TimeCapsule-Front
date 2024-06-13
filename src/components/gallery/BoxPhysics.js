import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, useBox, useSphere, usePlane } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
const Plane = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "Static",
    ...props,
  }));
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

const Box = (props) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position: props.position,
    type: "Static",
    args: props.size || [100, 1, 100],
    rotation: props.rotation,
    ...props,
  }));
  return (
    <mesh ref={ref} {...props} receiveShadow>
      <boxGeometry args={props.size || [100, 1, 100]} />
      <meshStandardMaterial transparent opacity={0.3} />
    </mesh>
  );
};

const FallingBall = (props) => {
  let radius = 4.5;
  const [ref] = useSphere(() => ({
    mass: 1,
    position: props.position,
    args: [radius],
    material: {
      restitution: 0.3, // 반발력을 높여서 공이 더 잘 튕겨나가도록 설정
      friction: 0.1, // 마찰을 낮춰서 공이 더 자연스럽게 굴러가도록 설정
    },
    ...props,
  }));
  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[radius, 50, 50]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Ball = (props) => {
  let radius = 4;
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: props.position,
    args: [radius],
    material: {
      restitution: 0, // 반발력을 0으로 설정하여 튕김 없음
      friction: 0.1, // 마찰 설정 유지
    },
    allowSleep: true, // sleep을 허용
    sleepSpeedLimit: 0.1, // 이 속도 이하로 떨어지면 sleep 상태로 전환
    sleepTimeLimit: 1, // 1초 동안 sleepSpeedLimit 이하이면 sleep 상태로 전환
    ...props,
  }));

  useEffect(() => {
    api.sleep(); // 컴포넌트가 마운트될 때 sleep 상태로 시작
  }, [api]);

  return (
    <mesh ref={ref} {...props} castShadow>
      <sphereGeometry args={[radius, 50, 50]} />
      <meshStandardMaterial color="#ffff" />
    </mesh>
  );
};

const Scene = ({ boxSize }) => {
  const balls = [];
  const numBalls = 50;
  const ballRadius = 3; // 공의 반지름 설정
  const ballDiameter = ballRadius * 2;
  const positions = [];

  function isOverlapping(newPos) {
    return positions.some((pos) => {
      const distance = Math.sqrt(
        (pos[0] - newPos[0]) ** 2 +
          (pos[1] - newPos[1]) ** 2 +
          (pos[2] - newPos[2]) ** 2
      );
      return distance < ballDiameter;
    });
  }

  for (let i = 0; i < numBalls; i++) {
    let newPos;
    do {
      newPos = [
        (Math.random() - 0.5) * (boxSize[0] - ballDiameter) +
          (Math.random() - 0.5) * 2,
        ballRadius, // 모든 공의 Y축 위치를 공의 반지름만큼 설정
        (Math.random() - 0.5) * (boxSize[2] - ballDiameter) +
          (Math.random() - 0.5) * 2,
      ];
    } while (isOverlapping(newPos));
    positions.push(newPos);
    balls.push(<Ball key={i} position={newPos} />);
  }

  return (
    <>
      <hemisphereLight
        skyColor={"white"}
        groundColor={"black"}
        intensity={2}
        position={[0, 100, 0]}
      />
      <Physics gravity={[0, -9.81, 0]}>
        <Plane />
        <Box
          position={[0, boxSize[1] / 2, -boxSize[2] / 2]}
          rotation={[0, 0, 0]}
          size={[boxSize[0], boxSize[1], 1]}
        />
        <Box
          position={[0, boxSize[1] / 2, boxSize[2] / 2]}
          rotation={[0, 0, 0]}
          size={[boxSize[0], boxSize[1], 1]}
        />
        <Box
          position={[-boxSize[0] / 2, boxSize[1] / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          size={[boxSize[2], boxSize[1], 1]}
        />
        <Box
          position={[boxSize[0] / 2, boxSize[1] / 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          size={[boxSize[2], boxSize[1], 1]}
        />
        {balls}
        <FallingBall
          position={[
            0, // X축 위치를 박스의 중앙으로 설정
            boxSize[1] / 2, // Y축 치를 박스 높이의 절반으로 설정
            ballRadius, // Z축 위치를 박스의 정 중앙에서 앞쪽으로 공의 반지름만큼 이동
          ]}
        />
      </Physics>
    </>
  );
};

const CameraBehavior = () => {
  const { camera } = useThree();

  useFrame(() => {
    // 현재 카메라 위치에서 살짝 위를 바라보도록 설정
    const lookAtPosition = new THREE.Vector3(
      camera.position.x,
      camera.position.y - 10,
      camera.position.z - 20
    );
    console.log(
      `lookAtPosition - x: ${lookAtPosition.x}, y: ${lookAtPosition.y}, z: ${lookAtPosition.z}`
    );
    camera.lookAt(lookAtPosition);
  });

  return null;
};

const BoxPhysics = () => {
  const [boxSize, setBoxSize] = useState([96 - 10, 108 - 10, 54 - 10]);

  useEffect(() => {
    const handleResize = () => {
      setBoxSize([96 - 10, 108 - 10, 54 / -10]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas camera={{ position: [0, 30, 40], fov: 30 }} shadows>
      <Scene boxSize={boxSize} />
      <CameraBehavior />
      <OrbitControls />
    </Canvas>
  );
};

export default BoxPhysics;
