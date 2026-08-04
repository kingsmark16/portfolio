"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const capstoneImages = [
  {
    src: "/capstone.png",
    alt: "ParsuWISE learning platform dashboard",
  },
  {
    src: "/cap1.png",
    alt: "ParsuWISE project screen 1",
  },
  {
    src: "/cap2.png",
    alt: "ParsuWISE project screen 2",
  },
  {
    src: "/cap3.png",
    alt: "ParsuWISE project screen 3",
  },
  {
    src: "/cap4.png",
    alt: "ParsuWISE project screen 4",
  },
  {
    src: "/cap5.png",
    alt: "ParsuWISE project screen 5",
  },
  {
    src: "/cap6.png",
    alt: "ParsuWISE project screen 6",
  },
  {
    src: "/cap7.png",
    alt: "ParsuWISE project screen 7",
  },
] as const;

export default function CapstoneCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = capstoneImages[currentIndex];

  function showPreviousImage() {
    setCurrentIndex((index) => (index - 1 + capstoneImages.length) % capstoneImages.length);
  }

  function showNextImage() {
    setCurrentIndex((index) => (index + 1) % capstoneImages.length);
  }

  return (
    <div
      className="wise-dashboard capstone-image"
      role="region"
      aria-roledescription="carousel"
      aria-label="ParsuWISE learning platform dashboard"
    >
      <div className="dashboard-carousel">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1906}
          height={942}
          sizes="(max-width: 74rem) calc(100vw - 3rem), 58vw"
        />
        <button className="carousel-control carousel-control-previous" type="button" onClick={showPreviousImage} aria-label="Show previous dashboard image">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button className="carousel-control carousel-control-next" type="button" onClick={showNextImage} aria-label="Show next dashboard image">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <span className="sr-only" aria-live="polite">Dashboard image {currentIndex + 1} of {capstoneImages.length}</span>
    </div>
  );
}
