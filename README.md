# ImageCarousel

A lightweight, dependency-free React carousel component with infinite looping, pause-at-card animation, reverse playback, and support for animated stop-motion cards.

> Built with React + TypeScript using the Web Animations API.

---

## Preview

### Vertical carousel

> Replace with your GIF

![Vertical Carousel](./assets/gifs/vertical.gif)

### Horizontal carousel

> Replace with your GIF

![Horizontal Carousel](./assets/gifs/horizontal.gif)

### Reverse direction

> Replace with your GIF

![Reverse Carousel](./assets/gifs/reverse.gif)

### Animated stop-motion cards

> Replace with your GIF

![Animated Cards](./assets/gifs/animated-cards.gif)

---

## Features

* Infinite seamless looping
* Vertical or horizontal scrolling
* Reverse playback
* Pause at every card
* Hover to pause
* Static and animated image support
* Fully configurable card size, gap, timing, and border radius
* No external animation libraries

---

## Installation

```bash
bun add your-package-name
# or
npm install your-package-name
```

---

## Basic Usage

```tsx
import ImageCarousel from "./ImageCarousel";

const images = [
  "/cards/1.webp",
  "/cards/2.webp",
  "/cards/3.webp",
];

export default function App() {
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

## Animated Cards

Each item can either be a single image or an array of images.

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

The frame animation is synchronized across every animated card.

---

## Horizontal Carousel

```tsx
<ImageCarousel
  images={images}
  direction="horizontal"
  cardWidth="18rem"
  cardHeight="24rem"
/>
```

---

## Reverse Playback

```tsx
<ImageCarousel
  images={images}
  direction="vertical"
  reverse
/>
```

---

## Props

| Prop            | Type                         | Default                   | Description                       |
| --------------- | ---------------------------- | ------------------------- | --------------------------------- |
| `images`        | `ImageSource[]`              | —                         | Array of images or frame arrays   |
| `direction`     | `"vertical" \| "horizontal"` | `"vertical"`              | Scroll direction                  |
| `reverse`       | `boolean`                    | `false`                   | Reverse loop direction            |
| `loopDuration`  | `number`                     | `20000`                   | Total loop duration (ms)          |
| `pauseDuration` | `number`                     | `0`                       | Pause at each card (ms)           |
| `frameInterval` | `number`                     | `120`                     | Frame interval for animated cards |
| `pauseOnHover`  | `boolean`                    | `true`                    | Pause animation on hover          |
| `gap`           | `number`                     | `24`                      | Gap between cards                 |
| `borderRadius`  | `number`                     | `24`                      | Card border radius                |
| `cardWidth`     | `string`                     | `clamp(18rem,32vw,26rem)` | Width of each card                |
| `cardHeight`    | `string`                     | `clamp(23rem,42vw,34rem)` | Height of each card               |
| `className`     | `string`                     | `""`                      | Root container class              |

---

## Component API

```tsx
<ImageCarousel
  images={images}
  direction="horizontal"
  reverse={false}
  loopDuration={20000}
  pauseDuration={1000}
  frameInterval={120}
  pauseOnHover
  gap={24}
  borderRadius={24}
  cardWidth="20rem"
  cardHeight="28rem"
/>
```

---

## ImageSource Type

```ts
type ImageSource = string | string[];
```

| Value                          | Result                    |
| ------------------------------ | ------------------------- |
| `"/card.webp"`                 | Static image              |
| `["1.webp","2.webp","3.webp"]` | Animated stop-motion card |

---

## Roadmap

* [ ] Drag / swipe support
* [ ] Variable card sizing
* [ ] Auto-fit layouts
* [ ] Programmatic controls (play, pause, seek)
* [ ] Vertical + horizontal wheel navigation

---

## License

MIT
