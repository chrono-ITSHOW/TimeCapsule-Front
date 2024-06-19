import React from "react";
// import SphareItem from '../components/gallery/SphareItem'
import { Canvas } from "@react-three/fiber";
import BoxPhysics from "../components/gallery/BoxPhysics";
import StartPageRedirect from "../components/gallery/StartPageRedirect";

function Gallery() {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          zIndex: 100,
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/timecapsule.png"
          alt="타임캡슐"
          style={{ objectFit: "cover", width: "35vw", paddingTop: "3.5vw" }}
        />
      </div>

      <BoxPhysics />
      <StartPageRedirect />
    </>
  );
}

export default Gallery;
