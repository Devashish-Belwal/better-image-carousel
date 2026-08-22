# Infinite Image Carousel (React + TypeScript)

A lightweight React image carousel with seamless infinite looping, support for vertical and horizontal scrolling, reverse playback, and animated stop-motion cards.

The repository contains only **two `.tsx` files**:

* `AnimatedSlot.tsx`
* `ImageCarousel.tsx`

Simply copy both files into your project and start using the component—no package installation or animation library required.

---

# Preview

## Vertical

![Vertical Demo](./public/gifs/vertical-demo.gif)

## Horizontal

![Horizontal Demo](./public/gifs/horizontal-demo.gif)

## Reverse Direction

![Reverse Demo](./public/gifs/reverse-demo.gif)

## Animated Stop-Motion Cards

![Animated Demo](./public/gifs/animated-demo.gif)

---

# Features

* Seamless infinite looping
* Vertical and horizontal scrolling
* Reverse playback
* Pause at every card
* Hover to pause
* Static and animated image support
* Configurable card size, gap, timing, and border radius
* Written in plain React + TypeScript

---

# Installation

Copy these two files into your project:

```text
components/
├── AnimatedSlot.tsx
└── ImageCarousel.tsx
```

Then import the carousel wherever you need it.

```tsx
import ImageCarousel from "./components/ImageCarousel";
```

---

# Basic Usage

```tsx
const images = [
  "/cards/1.webp",
  "/cards/2.webp",
  "/cards/3.webp",
];

export default function Example() {
  return (
    <div style={{ width: 360, height: 600 }}>
      <ImageCarousel
        images={images}
        direction="vertical"
      />
    </div>
  );
}
```

---

# Animated Cards

Each item can either be a single image or an array of frames.

```tsx
const images = [
  [
    "/frames/1.webp",
    "/frames/2.webp",
    "/frames/3.webp",
  ],
  "/cards/static.webp",
  [
    "/walk/1.webp",
    "/walk/2.webp",
    "/walk/3.webp",
  ],
];
```

The carousel automatically plays every animated card in sync.

---

# Horizontal Carousel

```tsx
<ImageCarousel
  images={images}
  direction="horizontal"
  cardWidth="18rem"
  cardHeight="24rem"
/>
```

---

# Reverse Playback

```tsx
<ImageCarousel
  images={images}
  direction="vertical"
  reverse
/>
```

---

# Props

| Prop            | Type                         | Default                   | Description                       |
| --------------- | ---------------------------- | ------------------------- | --------------------------------- |
| `images`        | `ImageSource[]`              | —                         | Array of images or frame arrays   |
| `direction`     | `"vertical" \| "horizontal"` | `"vertical"`              | Scroll direction                  |
| `reverse`       | `boolean`                    | `false`                   | Reverse loop direction            |
| `loopDuration`  | `number`                     | `20000`                   | Time for one complete loop (ms)   |
| `pauseDuration` | `number`                     | `0`                       | Pause at each card (ms)           |
| `frameInterval` | `number`                     | `120`                     | Frame interval for animated cards |
| `pauseOnHover`  | `boolean`                    | `true`                    | Pause on mouse hover              |
| `gap`           | `number`                     | `24`                      | Space between cards               |
| `borderRadius`  | `number`                     | `24`                      | Card border radius                |
| `cardWidth`     | `string`                     | `clamp(18rem,32vw,26rem)` | Width of each card                |
| `cardHeight`    | `string`                     | `clamp(23rem,42vw,34rem)` | Height of each card               |
| `className`     | `string`                     | `""`                      | Root container class              |

---

# ImageSource

```ts
type ImageSource = string | string[];
```

| Value                            | Result                    |
| -------------------------------- | ------------------------- |
| `"/card.webp"`                   | Static image              |
| `["1.webp", "2.webp", "3.webp"]` | Animated stop-motion card |

---

# License

MIT
