import { useState, useEffect, useCallback, useRef } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { useList, useMovie } from "@/hooks/requests";

import {
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import ReactPlayer from "react-player/lazy";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useUserStore from "@/hooks/useUserStore";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  visible?: boolean;
  onClose: any;
}

export default function MovieInfoModal({ visible, onClose }: Props) {
  let [isOpen, setIsOpen] = useState<boolean>(!!visible);
  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(true);

  const queryClient: any = useQueryClient();
  const { movieId: mId } = useInfoModalStore();
  const { user } = useUserStore();
  const ref = useRef<any>(null);

  const { data } = useMovie("movie", mId);
  const { data: list, isFetching } = useList(user?.id);

  function isMovie(movie: any) {
    return movie.movieId === mId;
  }
  const isAdded = list.find(isMovie);

  useEffect(() => {
    if (data?.videos) {
      const index = data?.videos.results.findIndex(
        (element: any) => element?.type === "Trailer"
      );
      setTrailer(data?.videos?.results[index]?.key);
    }
    return () => {
      setTrailer("pGNv5-dyRKA");
    };
  }, [data]);

  useEffect(() => {
    setIsOpen(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsOpen(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const addRemove: any = useMutation((data) => axios.post("/api/movie", data), {
    onSettled: () => {
      queryClient.invalidateQueries("my-list");
      setTimeout(() => {
        ref.current.style.backgroundColor = "transparent";
      }, 300);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleMyList = () => {
    ref.current.style.backgroundColor = "white";
    const body: any = {
      movieId: mId,
      userId: user?.id,
      thumb: data?.backdrop_path || data?.poster_path,
    };
    addRemove.mutate({ body });
  };
  if (!visible) {
    return null;
  }

  return (
    <>
      {isOpen ? (
        <AnimatePresence>
          <Dialog
            as="div"
            open={isOpen}
            key="dial"
            onClose={handleClose}
            className="relative z-50 overflow-hidden "
          >
            <m.div
              key="dial"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.25 },
              }}
              exit={{ opacity: 0 }}
              className="bg-black bg-opacity-80
            flex justify-center items-center fixed inset-0 overflow-y-scroll"
            >
              <Dialog.Panel>
                <div className="relative mx-auto max-w-md md:max-w-3xl rounded-md ">
                  <m.div
                    key="panel"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { duration: 0.25 },
                    }}
                    exit={{ scale: 0 }}
                    className="relative flex-auto bg-zinc-900 drop-shadow-md"
                  >
                    <div className="relative h-96">
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${
                          trailer ? trailer : "pGNv5-dyRKA"
                        }`}
                        playing
                        muted={muted}
                        width="100%"
                        height="100%"
                        className="brightness-[60%] object-cover"
                      />
                      <button
                        onClick={handleClose}
                        className="cursor-pointer absolute top-2 right-2 h-8 w-8 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                      >
                        <XMarkIcon className="text-white w-6" />
                      </button>
                      <div className="absolute bottom-0 h-10 left-2 sm:left-5">
                        <div className="flex flex-row items-center w-full">
                          <button
                            onClick={() => setMuted(!muted)}
                            className="cursor-pointer  h-8 w-8 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                          >
                            {muted ? (
                              <SpeakerXMarkIcon className="text-white w-6" />
                            ) : (
                              <SpeakerWaveIcon className="text-white w-6" />
                            )}
                          </button>{" "}
                          <p className="text-white text-xl h-full font-bold ml-2 line-clamp-1">
                            {data?.title}
                          </p>
                        </div>
                      </div>
                    </div>{" "}
                    <div className=" px-3 py-3 sm:px-12 sm:py-8">
                      <div className="flex flex-row items-center justify-between gap-2 mb-8">
                        <div>
                          <p className="text-green-400 font-semibold text-sm md:text-lg">
                            New
                          </p>

                          <p className="text-white text-sm md:text-lg">
                            {data?.genres?.map((genre: any, idx: number) => (
                              <span key={idx}>
                                {genre.name}
                                {idx < data?.genres?.length - 1 ? " | " : ""}
                              </span>
                            ))}
                          </p>
                        </div>

                        <button
                          ref={ref}
                          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-[gray] bg-[#2a2a2a]/60 transition hover:border-white hover:bg-white/10`}
                        >
                          {isAdded && !isFetching ? (
                            <CheckIcon
                              onClick={handleMyList}
                              className="h-7 w-7 text-white "
                              title="Remove from My List"
                            />
                          ) : (
                            <PlusIcon
                              onClick={handleMyList}
                              className="h-7 w-7 text-white "
                              title="Add to My List"
                            />
                          )}
                        </button>
                      </div>
                      <p className="text-white text-sm md:text-lg">
                        {data?.overview}
                      </p>
                    </div>
                  </m.div>
                </div>
              </Dialog.Panel>
            </m.div>
          </Dialog>
        </AnimatePresence>
      ) : null}
    </>
  );
}
