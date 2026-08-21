import ImageCarousel from "@/components/customs/ImageCarousel";

const images = [
  [
    "/cards/koy-sun-01.webp",
    "/cards/koy-sun-02.webp",
    "/cards/koy-sun-03.webp",
  ],
  "/cards/koy-sun-04.webp",
  "/cards/koy-sun-05.webp",
  "/cards/koy-sun-06.webp",
  // "/cards/koy-sun-07.webp",
  [
    "/cards/koy-sun-01.webp",
    "/cards/koy-sun-02.webp",
    "/cards/koy-sun-03.webp",
  ]
];

export default function Playground() {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-slate-900 p-8">
      <div className="border border-black w-[100vw] h-[80vh] rounded-3xl p-[0vh]">
        <ImageCarousel
          images={images}
          direction="vertical"
          cardWidth="22rem"
          cardHeight="30rem"
          pauseDuration={2000}
          loopDuration={20000}
        />
      </div>
      <div className="border border-black w-[100vh] h-[100vw] rounded-3xl p-[5vh]">
        <ImageCarousel
          images={images}
          direction="horizontal"
          // reverse
          cardWidth="18rem"
          cardHeight="24rem"
          pauseDuration={2000}
          loopDuration={20000}
          frameInterval={100}
        />
      </div>
    </div>
  );
}













// "use client";

// import AnimatedSlot from "@/components/customs/AnimatedSlot";
// import { useEffect, useState } from "react";
// // import koySun from '@/assets/koy-sun-01.webp'
// // import { images } from '@/components/customs/images'

// const PORTRAIT_RATIO = 900 / 1600;   // 0.5625
// const LANDSCAPE_RATIO = 1600 / 900;  // 1.777...

// export default function Playground() {
//   const [size, setSize] = useState({
//     w: window.innerWidth,
//     h: window.innerHeight,
//   });

//   useEffect(() => {
//     const onResize = () =>
//       setSize({
//         w: window.innerWidth,
//         h: window.innerHeight,
//       });

//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const isLandscape = size.w >= size.h;
//   const viewportRatio = size.w / size.h;

//   const shouldLetterbox = isLandscape
//     ? viewportRatio > LANDSCAPE_RATIO
//     : viewportRatio > PORTRAIT_RATIO;

//   const koySun = [
//     "/cards/koy-sun-01.webp",
//     "/cards/koy-sun-02.webp",
//     "/cards/koy-sun-03.webp",
//     "/cards/koy-sun-04.webp",
//     "/cards/koy-sun-05.webp",
//     "/cards/koy-sun-06.webp",
//     "/cards/koy-sun-07.webp",
//     "/cards/koy-sun-08.webp",
//     "/cards/koy-sun-09.webp",
//     "/cards/koy-sun-10.webp",
//     "/cards/koy-sun-11.webp",
//     "/cards/koy-sun-10.webp",
//     "/cards/koy-sun-09.webp",
//     "/cards/koy-sun-08.webp",
//     "/cards/koy-sun-07.webp",
//     "/cards/koy-sun-06.webp",
//     "/cards/koy-sun-05.webp",
//     "/cards/koy-sun-04.webp",
//     "/cards/koy-sun-03.webp",
//     "/cards/koy-sun-02.webp"
//   ];

//   // console.log(koySun);

//   return (
//     <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
//       <main
//         className={[
//           "bg-gray-500 overflow-y-auto shadow-2xl flex justify-center items-center",

//           shouldLetterbox
//             ? isLandscape
//               ? "h-full w-auto aspect-video"
//               : "h-full w-auto aspect-9/16"
//             : "w-full h-full",
//         ].join(" ")}
//       >
//         <div
//           style={{
//             width: 320,
//             height: 420,
//             borderRadius: 24,
//             overflow: "hidden",
//           }}
//         >
//           <AnimatedSlot image={koySun} />
//         </div>
//       </main>
//     </div>
//   );
// }