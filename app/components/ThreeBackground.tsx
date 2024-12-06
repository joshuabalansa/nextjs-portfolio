"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PortfolioObjectWithIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let cube: THREE.Mesh;

    function init() {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(renderer.domElement);
      }

      // Load Textures
      const textureLoader = new THREE.TextureLoader();
      const textures = [
        textureLoader.load("/icons/react.png"),
        textureLoader.load("/icons/laravel.png"),
        textureLoader.load("/icons/go.png"),
        textureLoader.load("/icons/linux.png"),
        textureLoader.load("/icons/php.png"),
        textureLoader.load("/icons/javascript.png"), 
      ];

      // Cube Geometry
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const materials = textures.map((texture) => new THREE.MeshBasicMaterial({ map: texture }));

      cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Resize Listener
      window.addEventListener("resize", onResize, false);
      onResize(); // Adjust size on load
    }

    function onResize() {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        camera.aspect = offsetWidth / offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(offsetWidth, offsetHeight);
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      // Rotate Cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "600px", overflow: "hidden", marginBottom: "20px" }} />;
}
