"use client";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

type CardDataType = {
  posterUrl?: string;
  description?: string;
  genre?: string;
  language?: string;
  relativeUrl?: string;
  title?: string;
  year?: string;
  rating?: string;
};

const HoverCard = ({
  isMobile = false,
  isHovering,
  posterUrl,
  relativeUrl,
  title,
  year,
  genre,
  rating,
  language,
  description,
}: {
  isHovering: boolean;
  isMobile?: boolean;
} & CardDataType) => {
  return (
    <div
      className={clsx(
        "w-72 h-96  bg-black rounded-md shadow-sm shadow-purple-950 z-20 scale-0 transition-all duration-300 border-[0.5px] border-gray-700",
        {
          "scale-100 ": isHovering,
          absolute: !isMobile,
        }
      )}
    >
      <div className="w-full h-44 relative">
        {posterUrl && (
          <img
            src={posterUrl}
            alt=""
            className="h-full w-full object-cover absolute rounded-t-md"
          />
        )}

        {/* bottom blur gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-100 " />
      </div>

      <div
        className={clsx(
          "p-4 flex flex-col gap-3 translate-x-[-40px] delay-200 duration-200 opacity-0",
          {
            "translate-x-[0px] opacity-100": isHovering,
          }
        )}
      >
        <div className="flex gap-4 w-full text-sm">
          <Link
            href={relativeUrl ?? ""}
            className="bg-gray-100 py-2 text-gray-900 flex justify-center w-4/5 rounded-md"
          >
            Book Tickets
          </Link>
          <div className="bg-gray-100 py-2 text-gray-900 flex justify-center w-1/5 rounded-md">
            +
          </div>
        </div>

        <div>{title}</div>

        <div className="flex gap-3 text-sm">
          <div>{year}</div>
          <div>{genre}</div>
          <div>{rating}</div>
          <div>{language}</div>
        </div>

        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  );
};

const MovieCard = ({ data }: { data: CardDataType }) => {
  const [isHovering, setisHovering] = useState(false);

  const isMobile = false;

  if (!data) return null;
  const {
    posterUrl,
    description,
    genre,
    language,
    relativeUrl,
    title,
    year,
    rating,
  } = data;

  if (isMobile) {
    return (
      <HoverCard
        isMobile={true}
        isHovering={true}
        posterUrl={posterUrl}
        relativeUrl={relativeUrl}
        title={title}
        year={year}
        genre={genre}
        rating={rating}
        language={language}
        description={description}
      />
    );
  }

  return (
    <div
      className=" w-56 h-72  rounded-md bg-white relative"
      onMouseEnter={() => {
        setisHovering(true);
      }}
      onMouseLeave={() => {
        setisHovering(false);
      }}
    >
      <img
        src={posterUrl}
        alt=""
        className="w-full h-full object-cover rounded-md absolute"
      />

      <HoverCard
        isHovering={isHovering}
        posterUrl={posterUrl}
        relativeUrl={relativeUrl}
        title={title}
        year={year}
        genre={genre}
        rating={rating}
        language={language}
        description={description}
      />
    </div>
  );
};

export default function MoviesPage() {
  const cardsData: CardDataType[] = [
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    {
      posterUrl:
        "https://img10.hotstar.com/image/upload/f_auto,q_90,w_640/sources/r1/cms/prod/8440/1739255198440-v",
      description:
        "After 19 seasons, Roadies is back! Season 20, Roadies XX, introduces a thrilling new element: betrayal. Expect the unexpected.",
      genre: "Reality TV",
      language: "Hindi",
      relativeUrl: "/shows/mtv-roadies",
      title: "Dungeons and Dragons",
      year: "2025",
      rating: "U/A 16+",
    },
    // Add more cards as needed
  ];

  return (
    <div className="flex flex-wrap gap-x-10 gap-y-14 justify-center md:justify-start pb-20">
      {cardsData.map((card, index) => (
        <MovieCard key={index} data={card} />
      ))}
    </div>
  );
}
