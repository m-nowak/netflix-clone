import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const NEXT_URL = process.env.NEXT_PUBLIC_NEXT_URL;

export function useNetflixOrg() {
  const { status, data, error } = useQuery({
    queryKey: ["netflix-org"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`
      );
      return data.results;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return { status, data, error };
}

export function useMovie(media_type: any, id: any) {
  const { status, data, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/${media_type === "tv" ? "tv" : "movie"}/${id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      );
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  return { status, data, error };
}

export function useTrending() {
  const { status, data, error } = useQuery({
    queryKey: ["netflix-org"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
      );
      return data.results;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return { status, data, error };
}
export function useTopRated() {
  const { status, data, error } = useQuery({
    queryKey: ["top-rated"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
      );
      return data.results;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return { status, data, error };
}
export function useAction() {
  const { status, data, error } = useQuery({
    queryKey: ["actions"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`
      );
      return data.results;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return { status, data, error };
}
export function useComedy() {
  const { status, data, error } = useQuery({
    queryKey: ["comedies"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`
      );
      return data.results;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return { status, data, error };
}
export function useHorror() {
  const { status, data, error } = useQuery({
    queryKey: ["horrors"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`
      );
      return data.results;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return { status, data, error };
}
export function useUsers() {
  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`${NEXT_URL}/api/user`);
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return { isError, data, isLoading, isFetching };
}
export function useList(id: any) {
  const { isLoading, data, isError, isFetching, isInitialLoading } = useQuery({
    queryKey: ["my-list"],
    queryFn: async () => {
      const { data } = await axios.get(`${NEXT_URL}/api/movie?id=${id}`);
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return { isError, data, isLoading, isFetching, isInitialLoading };
}
