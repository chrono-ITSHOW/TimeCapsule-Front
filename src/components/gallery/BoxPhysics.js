import React, { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, useBox, useSphere, usePlane } from "@react-three/cannon";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import axios from "axios";
// import { OrbitControls  from "@react-three/drei";
import { CapsuleContext } from "../../pages/CapsuleProvider";
//plane
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
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
};

//box
const Box = (props) => {
  const [ref] = useBox(() => ({
    mass: 0, // 정적 객체
    position: props.position,
    args: props.size || [100, 1, 100],
    rotation: props.rotation,
    type: "Static",
    ...props,
  }));

  return (
    <mesh ref={ref} {...props} receiveShadow>
      <boxGeometry args={props.size || [100, 1, 100]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
};

//ball
const Ball = ({ image, position }) => {
  let radius = 5;
  const [ref, api] = useSphere(() => ({
    mass: 100000,
    position: [position[0], position[1] + radius, position[2]],
    args: [radius],
    material: {
      restitution: 0.01,
      friction: 0.5,
    },
  }));

  // 이미지 URL이 유효하지 않은 경우 기본 이미지를 사용
  const validImage =
    process.env.REACT_APP_HOST + "/" + image || "/images/cover1.jpg"; // 기본 이미지 경로로 수정 필요
  const texture = useLoader(TextureLoader, validImage);

  useEffect(() => {
    api.velocity.set(0, 0, 0);
  }, [api]);

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

//fallingball
const FallingBall = (props) => {
  let radius = 4.5;
  const { capsuleId } = useContext(CapsuleContext);
  const [capsuleImage, setCapsuleImage] = useState(
    `${process.env.PUBLIC_URL}/images/cover1.jpg`
  );

  useEffect(() => {
    const getSentCapsuleLetter = async () => {
      const id = localStorage.getItem("capsule_id");
      console.log(id);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}/letters/capsule/${id}`
        );
        if (response.status === 200) {
          // let obj = response.data;
          setCapsuleImage(
            `${process.env.REACT_APP_HOST}/${response.data.capsule}`
          );
        }
      } catch (error) {
        console.error("보낸 캡슐 정보 가져오기 실패", error);
      }
    };
    getSentCapsuleLetter();
  }, [capsuleId, capsuleImage]);
  console.log(capsuleImage);
  const [ref] = useSphere(() => ({
    mass: 8,
    position: [
      props.position[0],
      props.position[1] + radius,
      props.position[2],
    ],
    args: [radius],
    material: {
      restitution: 0.01,
      friction: 0.9,
    },
  }));

  const texture = useLoader(THREE.TextureLoader, capsuleImage);

  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[radius, 50, 50]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

//scene
const Scene = ({ boxSize, images }) => {
  const balls = [];
  const numBalls = images.length;
  const ballRadius = 3;
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
        ballRadius,
        (Math.random() - 0.5) * (boxSize[2] - ballDiameter) +
          (Math.random() - 0.5) * 2,
      ];
    } while (isOverlapping(newPos));
    positions.push(newPos);
    balls.push(<Ball key={i} position={newPos} image={images[i].capsule} />);
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
        <Box
          position={[0, boxSize[1], 0]}
          rotation={[0, 0, 0]}
          size={[boxSize[0], 1, boxSize[2]]}
        />
        {balls}
        <FallingBall position={[0, boxSize[1] / 2, ballRadius]} />
      </Physics>
    </>
  );
};

//camerabehavior
const CameraBehavior = () => {
  const { camera } = useThree();

  useEffect(() => {
    console
      .log
      // `lookAtPosition - x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`
      ();
  }, [camera]);
  useFrame(() => {
    const lookAtPosition = new THREE.Vector3(
      camera.position.x,
      camera.position.y - 5,
      camera.position.z - 30
    );

    camera.lookAt(lookAtPosition);
  });

  return null;
};

//scenebackground
const SceneBackground = () => {
  const { scene } = useThree();
  const loader = new THREE.TextureLoader();

  useEffect(() => {
    loader.load(
      "/images/galleryBackground.jpg", // 이미지 경로 확인
      (texture) => {
        scene.background = texture; // 텍스처 로드 성공 시 씬의 배경으로 설정
      },
      undefined,
      (error) => {
        console.error("배경 이미지 로드 실패:", error); // 로드 실패 시 콘솔에 에러 출력
      }
    );
  }, [scene]);

  return null;
};

//boxphysis
const BoxPhysics = () => {
  const [boxSize, setBoxSize] = useState([96 / 2, 108 / 2 - 10, 54 - 10]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}/letters/capsules/latest`
        );
        if (response.status === 200) {
          setImages(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("공 이미지 가져오기 실패", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <Canvas
      style={{ position: "absolute", top: 0, left: 0 }}
      camera={{ position: [0, 19, 40], fov: 30 }}
      shadows
    >
      <SceneBackground />
      <Scene boxSize={boxSize} images={images} />
      <CameraBehavior />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default BoxPhysics;
