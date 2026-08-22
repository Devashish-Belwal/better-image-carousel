import { useEffect, useMemo, useState } from "react";

export type ImageSource = string | string[];

interface AnimatedSlotProps {
  image: ImageSource;
  frame?: number;
  className?: string;
  onSize?: (width: number, height: number) => void;
}

export default function AnimatedSlot({
  image,
  frame = 0,
  className = "",
  onSize
}: AnimatedSlotProps) {
  const isAnimated = Array.isArray(image);
  const [loaded, setLoaded] = useState(!isAnimated);

  // Preload every frame if this is a stop-motion slot
  useEffect(() => {
    if (!isAnimated) {
      setLoaded(true);
      return;
    }

    let cancelled = false;

    const preload = async () => {
      const promises = image.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      );

      await Promise.all(promises);

      if (!cancelled) setLoaded(true);
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, [image, isAnimated]);

  const currentSrc = useMemo(() => {
    if (!isAnimated) return image;

    const safeFrame = frame % image.length;
    return image[safeFrame];
  }, [image, isAnimated, frame]);

  return (
    <>
      <style>{`
        .animated-slot{
          width:100%;
          height:100%;
          overflow:hidden;
          border-radius:inherit;
          background:#ececec;
        }

        .animated-slot img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          user-select:none;
          -webkit-user-drag:none;
        }
      `}</style>

      <div className={`animated-slot ${className}`}>
        {loaded && <img
          src={currentSrc}
          alt=""
          draggable={false}
          onLoad={(e) => {
            onSize?.(
              e.currentTarget.naturalWidth,
              e.currentTarget.naturalHeight
            );
          }}
        />}
      </div>
    </>
  );
}