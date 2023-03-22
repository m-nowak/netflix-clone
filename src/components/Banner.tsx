"use client";

import { useNetflixOrg } from "@/hooks/requests";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useInfoModalStore from "@/hooks/useInfoModalStore";

export default function Banner() {
  const { openModal } = useInfoModalStore();
  const { data } = useNetflixOrg();
  const [movie, setMovie] = useState<any | null>(null);
  useEffect(() => {
    setMovie(data[Math.floor(Math.random() * data?.length)]);
  }, [data]);

  const handleOpenModal = useCallback(() => {
    openModal(movie?.id);
  }, [openModal, movie?.id]);

  return (
    <div className="relative flex flex-col space-y-2 h-[65vh]  lg:h-[95vh] py-16 md:space-y-4 lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[65vh] lg:h-[95vh] w-full brightness-[60%] transition duration-500">
        {movie ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${
              movie?.backdrop_path || movie?.poster_path
            }`}
            alt="banner movie"
            fill
            priority
            className="object-cover"
          />
        ) : null}
      </div>
      <div className=" absolute top-[52%] ml-4 md:ml-16">
        <p className="text-white text-2xl md:text-5xl h-full w-[75%] font-bold drop-shadow-xl truncate">
          {movie?.title || movie?.name || movie?.original_name}
        </p>
        <p className="text-white text-sm md:text-lg mt-2 md:mt-6 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl line-clamp-2">
          {movie?.overview}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button
            onClick={handleOpenModal}
            aria-label="play"
            className="bg-white rounded-md py-2 px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
          >
            <PlayIcon className="w-4 md:w-7 text-black mr-1" />
            Play
          </button>
          <button
            onClick={handleOpenModal}
            aria-label="more info"
            className="
          bg-white
          text-white
            bg-opacity-30 
            rounded-md 
            py-2  
            px-4
            w-auto 
            text-xs 
            lg:text-lg 
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-opacity-20
            transition
          "
          >
            <InformationCircleIcon className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
