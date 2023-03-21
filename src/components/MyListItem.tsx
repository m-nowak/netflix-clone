import Image from "next/image";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import { useCallback } from "react";

export default function MovieItem({ movie }: any) {
  const { openModal } = useInfoModalStore();
  const handleOpenModal = useCallback(() => {
    openModal(movie?.movieId);
  }, [openModal, movie?.movieId]);
  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
      onClick={handleOpenModal}
    >
      {movie ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie?.thumb}`}
          className="rounded-sm object-cover md:rounded"
          alt={"movie"}
          fill
          sizes="(min-width: 60em) 24vw,
              (min-width: 28em) 45vw,
              100vw"
        />
      ) : null}
    </div>
  );
}
