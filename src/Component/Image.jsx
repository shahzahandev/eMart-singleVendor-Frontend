import React from 'react'
import callsImg from "../assets/banner-calls.webp";
import musicImg from "../assets/banner-music.webp";
import gamerImg from "../assets/banner-gamer.webp";
import travelImg from "../assets/banner-travel.webp";
import focusImg from "../assets/banner-focus.webp";

const IMAGES = [
  {
    id: 1,
    src: callsImg,
    alt: "callsImg",
  },
  {
    id: 2,
    src: musicImg,
    alt: "musicImg",
  },
  {
    id: 3,
    src: travelImg,
    alt: "travelImg",
  },
  {
    id: 4,
    src: gamerImg,
    alt: "gamerImg",
  },
  {
    id: 5,
    src: focusImg,
    alt: "focusImg",
  },
];

const Image = () => {
  return (
  <>
    <section className="flex gap-2 w-full flex-col">
      {IMAGES.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt={img.alt}
          className="w-full h-auto object-cover"
        />
      ))}
    </section>
  </>
  )
}

export default Image