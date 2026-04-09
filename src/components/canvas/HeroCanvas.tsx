import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Points, PointMaterial, Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

const particlesCount = 1500;
const particlePositions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 20; // x
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
}

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = particlePositions;

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f5ff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const AnimatedGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const { x, y } = state.pointer;
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.3, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.3, 0.05);
    }
    
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.2;
      outerRingRef.current.rotation.y += delta * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.3;
      innerRingRef.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -2]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Icosahedron args={[1.2, 4]} position={[0, 0, 0]}>
          <MeshDistortMaterial 
            color="#7c3aed" 
            emissive="#7c3aed"
            emissiveIntensity={0.5}
            transparent 
            opacity={0.15}
            wireframe
            distort={0.3} 
            speed={1.5} 
          />
        </Icosahedron>

        <Torus ref={innerRingRef} args={[1.8, 0.015, 16, 100]}>
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1} wireframe={true} />
        </Torus>

        <Torus ref={outerRingRef} args={[2.2, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.8} wireframe={true} />
        </Torus>
      </Float>
    </group>
  );
};

export const HeroCanvas = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        
        <ParticleField />
        <AnimatedGeometry />

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.5} 
            luminanceSmoothing={0.9} 
            intensity={0.6} 
            mipmapBlur 
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.001, 0.001)} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
