"use client";

import useUserStore from "@/hooks/useUserStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { useRef, useState, useEffect } from "react";

import MyListItem from "./MyListItem";

interface Props {
  title: string;
  movies: [];
}

export default function MovieList({ title, movies }: Props) {
  const rowRef = useRef<null | HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollEnd, setScrollEnd] = useState<boolean>(false);

  const slide = (shift: string) => {
    if (rowRef.current) {
      const { scrollLeft, offsetWidth } = rowRef.current;
      const scrollTo =
        shift === "left" ? scrollLeft - offsetWidth : scrollLeft + offsetWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      setScrollX(scrollX + scrollTo);

      if (
        Math.floor(rowRef.current.scrollWidth - rowRef.current.scrollLeft) <=
        rowRef.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  const scrollCheck = () => {
    if (rowRef.current) {
      setScrollX(rowRef.current.scrollLeft);
      if (
        Math.floor(rowRef.current.scrollWidth - rowRef.current.scrollLeft) <=
        rowRef.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  useEffect(() => {
    if (
      rowRef?.current &&
      rowRef?.current?.scrollWidth === rowRef?.current?.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
    return () => {};
  }, [rowRef?.current?.scrollWidth, rowRef?.current?.offsetWidth]);

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 pl-2 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 text-[#e5e5e5] bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            scrollX === 0 ? "hidden" : ""
          } 
        `}
          onClick={() => slide("left")}
        />
        <div
          onScroll={scrollCheck}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
          ref={rowRef}
        >
          {movies.map((movie, idx) => (
            <MyListItem key={idx} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className={`absolute top-0 bottom-0 text-[#e5e5e5] right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            scrollEnd ? "hidden" : ""
          }`}
          onClick={() => slide("right")}
        />
      </div>
    </div>
  );
}
