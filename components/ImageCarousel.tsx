import { useEffect, useRef, useState } from "react";
import AnimatedSlot, { type ImageSource } from "./AnimatedSlot";

type ScrollDirection = "vertical" | "horizontal";

interface ImageCarouselProps {
  images: ImageSource[];

  direction?: ScrollDirection;

  loopDuration?: number;
  pauseDuration?: number;
  frameInterval?: number;
  pauseOnHover?: boolean;

  reverse?: boolean;

  gap?: number;
  borderRadius?: number;
  cardWidth?: string;
  cardHeight?: string;
  className?: string;
}

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function ImageCarousel({
  images,
  loopDuration = 20000,
  pauseDuration = 0,
  frameInterval = 120,
  pauseOnHover = true,
  direction = "vertical",
  reverse = false,
  gap = 24,
  borderRadius = 24,
  cardWidth = "clamp(18rem,32vw,26rem)",
  cardHeight = "clamp(23rem,42vw,34rem)",
  className = "",
}: ImageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  // const runningRef = useRef(true);
  const pausedRef = useRef(false);

  const [isLandscape, setIsLandscape] = useState(true);
  const [frames, setFrames] = useState(() => images.map(() => 0));
  const [stepSize, setStepSize] = useState(0);

  const stepDuration =
    images.length === 0
      ? loopDuration
      : Math.max(
        100,
        (loopDuration - pauseDuration * images.length) / images.length
      );

  const track = [...images, ...images];

  useEffect(() => {
    setFrames(images.map(() => 0));
  }, [images]);

  // Detect parent orientation
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setIsLandscape(entry.contentRect.width >= entry.contentRect.height);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Measure one card + gap
  const measureStep = () => {
    if (!trackRef.current?.firstElementChild) return 0;

    const rect = (
      trackRef.current.firstElementChild as HTMLElement
    ).getBoundingClientRect();

    return direction === "vertical"
      ? rect.height + gap
      : rect.width + gap;
  };

  // Update measurements
  useEffect(() => {
    const update = () => {
      const size = measureStep();
      if (size) setStepSize(size);
    };

    update();

    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isLandscape, direction, gap]);

  // Shared stop-motion animation
  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;

      setFrames(prev =>
        prev.map((frame, i) => {
          const img = images[i];
          return Array.isArray(img) ? (frame + 1) % img.length : 0;
        })
      );
    }, frameInterval);

    return () => clearInterval(id);
  }, [images, frameInterval]);

  // Infinite carousel with pauses at each slot
  useEffect(() => {
    if (!trackRef.current || stepSize === 0 || images.length === 0) return;

    const trackEl = trackRef.current;

    const totalPause = images.length * pauseDuration;
    const moveTime = Math.max(1, loopDuration - totalPause);

    const keyframes: Keyframe[] = [];

    for (let i = 0; i <= images.length; i++) {
      const position = Math.min(i, images.length) * stepSize;

      const holdOffset =
        (i * (moveTime / images.length + pauseDuration)) / loopDuration;

      const moveOffset =
        i === images.length
          ? 1
          : (i * (moveTime / images.length + pauseDuration) + pauseDuration) /
          loopDuration;

      const start = reverse ? -images.length * stepSize : 0;

      const translate = reverse
        ? start + position
        : -position;

      const transform =
        direction === "vertical"
          ? `translate3d(0, ${translate}px, 0)`
          : `translate3d(${translate}px, 0, 0)`;

      // Stay still
      keyframes.push({
        transform,
        offset: Number(holdOffset.toFixed(6)),
      });

      // Then move
      keyframes.push({
        transform,
        offset: Number(moveOffset.toFixed(6)),
      });
    }

    const animation = trackEl.animate(keyframes, {
      duration: loopDuration,
      easing: "linear",
      iterations: Infinity,
      fill: "both",
    });

    animation.currentTime = reverse ? 0 : 0;

    animationRef.current = animation;

    return () => animation.cancel();
  }, [
    isLandscape,
    stepSize,
    images.length,
    loopDuration,
    pauseDuration,
    reverse,
  ]);

  return (
    <>
      <style>{`
        .ic-root{
          width:100%;
          height:100%;
          overflow:hidden;
          position:relative;
        }

        .ic-track{
          display:flex;
          will-change:transform;
        }

        .ic-card{
          flex-shrink:0;
          overflow:hidden;
        }
      `}</style>

      <div
        ref={containerRef}
        className={`ic-root ${className}`}
        onMouseEnter={() => {
          if (!pauseOnHover) return;
          animationRef.current?.pause();
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!pauseOnHover) return;
          animationRef.current?.play();
          pausedRef.current = false;
        }}
      >
        <div
          ref={trackRef}
          className="ic-track"
          style={{
            flexDirection: direction === "vertical" ? "column" : "row",
            gap: `${gap}px`,
          }}
        >
          {track.map((image, index) => {
            const realIndex = index % images.length;

            return (
              <div
                key={index}
                className="ic-card"
                style={{
                  borderRadius,
                  width: cardWidth,
                  height: cardHeight,
                }}
              >
                <AnimatedSlot image={image} frame={frames[realIndex]} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}