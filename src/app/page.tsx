"use client";

import useInfoModalStore from "@/hooks/useInfoModalStore";
import useUserStore from "@/hooks/useUserStore";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import MovieList from "@/components/MovieList";
import {
  useTrending,
  useTopRated,
  useAction,
  useComedy,
  useHorror,
  useList,
} from "@/hooks/requests";
import MovieInfoModal from "@/components/MovieInfoModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MyList from "@/components/MyList";
export default function Home() {
  const { isOpen, closeModal } = useInfoModalStore();
  const { isLoggedIn, user } = useUserStore();
  const { data: trending } = useTrending();
  const { data: topRated } = useTopRated();
  const { data: action } = useAction();
  const { data: comedy } = useComedy();
  const { data: horror } = useHorror();
  const { data: list } = useList(user?.id);
  const router = useRouter();

  useEffect(() => {
    !isLoggedIn ? router.push("/auth") : null;
  }, []);
  return (
    <>
      <Navbar />
      <main className="relative pb-24">
        <Banner />
        <section className="md:space-y-24 pb-20 relative z-10 -top-10 md:-top-14 overflow-hidden">
          <MovieList title="Trending Now" movies={trending} />
          <MovieList title="Top Rated" movies={topRated} />
          <MyList title="My List" movies={list} />
          <MovieList title="Action Thrillers" movies={action} />
          <MovieList title="Comedies" movies={comedy} />
          <MovieList title="Scary Movies" movies={horror} />
          <MovieInfoModal visible={isOpen} onClose={closeModal} />
        </section>
      </main>
    </>
  );
}
