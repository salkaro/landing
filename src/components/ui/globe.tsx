"use client";
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { GlobeMethods } from 'react-globe.gl';

// Dynamically import GlobeGL to prevent SSR issues
const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false });

const ARC_REL_LEN = 0.02; // relative to whole arc
const FLIGHT_TIME = 5000;
const NUM_RINGS = 1;
const RINGS_MAX_R = 10; // degrees
const RING_PROPAGATION_SPEED = 3; // degrees/second

interface Arc {
	startLat: number;
	startLng: number;
	endLat: number;
	endLng: number;
}

interface Ring {
	lat: number;
	lng: number;
}

const Globe: React.FC = () => {
	const [arcsData, setArcsData] = useState<Arc[]>([]);
	const [ringsData, setRingsData] = useState<Ring[]>([]);
	const [size, setSize] = useState({ width: 0, height: 0 });

	const containerRef = useRef<HTMLDivElement | null>(null);
    const globeRef = useRef<GlobeMethods | undefined>(undefined);

	const getRandomCoords = (): Ring => ({
		lat: Math.random() * 180 - 90,
		lng: Math.random() * 360 - 180,
	});

	const validateCoords = (coords: Ring): boolean => {
		return (
			typeof coords.lat === 'number' &&
			!isNaN(coords.lat) &&
			typeof coords.lng === 'number' &&
			!isNaN(coords.lng)
		);
	};

	// Update size on window resize
	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const { offsetWidth, offsetHeight } = containerRef.current;
				setSize({ width: offsetWidth, height: offsetHeight });
			}
		};

		updateSize(); // Set initial size
		window.addEventListener("resize", updateSize); // Update on resize

		return () => {
			window.removeEventListener("resize", updateSize); // Clean up on unmount
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			const startCoords = getRandomCoords();
			const endCoords = getRandomCoords();

			if (validateCoords(startCoords) && validateCoords(endCoords)) {
				const arc: Arc = {
					startLat: startCoords.lat,
					startLng: startCoords.lng,
					endLat: endCoords.lat,
					endLng: endCoords.lng,
				};

				setArcsData((curArcsData) => [...curArcsData, arc]);
				setTimeout(() => setArcsData((curArcsData) => curArcsData.filter((d) => d !== arc)), FLIGHT_TIME * 2);

				const srcRing: Ring = { lat: startCoords.lat, lng: startCoords.lng };
				setRingsData((curRingsData) => [...curRingsData, srcRing]);
				setTimeout(() => setRingsData((curRingsData) => curRingsData.filter((r) => r !== srcRing)), FLIGHT_TIME * ARC_REL_LEN);

				setTimeout(() => {
					const targetRing: Ring = { lat: endCoords.lat, lng: endCoords.lng };
					setRingsData((curRingsData) => [...curRingsData, targetRing]);
					setTimeout(() => setRingsData((curRingsData) => curRingsData.filter((r) => r !== targetRing)), FLIGHT_TIME * ARC_REL_LEN);
				}, FLIGHT_TIME);
			} else {
				console.error('Invalid coordinates:', { startCoords, endCoords });
			}
		}, 500);

		return () => clearInterval(interval);
	}, []);


	// Add slow rotation to the globe
	useEffect(() => {
		const rotateInterval = setInterval(() => {
			if (globeRef.current) {
				const controls = globeRef.current.controls(); // Access camera controls
				controls.autoRotate = true; // Enable auto-rotation
				controls.autoRotateSpeed = 0.2; // Slow rotation speed
				controls.update(); // Trigger control updates
			}
		}, 30); // Adjust rotation over time

		return () => clearInterval(rotateInterval); // Clean up interval on unmount
	}, []);


	return (
		<div ref={containerRef} className="relative w-full h-full overflow-hidden pointer-events-none">
			<GlobeGL
				ref={globeRef}
                backgroundColor="rgba(0,0,0,0)"
				globeImageUrl="/globe/earth-night.jpg"
				arcsData={arcsData}
				arcColor={() => 'darkOrange'}
				arcDashLength={ARC_REL_LEN}
				arcDashGap={2}
				arcDashInitialGap={1}
				arcDashAnimateTime={FLIGHT_TIME}
				arcsTransitionDuration={0}
				ringsData={ringsData}
				ringColor={() => (t: number) => `rgba(255,100,50,${1 - t})`}
				ringMaxRadius={RINGS_MAX_R}
				ringPropagationSpeed={RING_PROPAGATION_SPEED}
				ringRepeatPeriod={(FLIGHT_TIME * ARC_REL_LEN) / NUM_RINGS}
				width={size.width}
				height={size.height}
			/>
		</div>
	);
};

export default Globe;
