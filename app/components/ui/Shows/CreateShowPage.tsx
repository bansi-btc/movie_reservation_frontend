"use client";
import { useState } from "react";
import { Calendar, Clock, Film, Users } from "lucide-react";
import { FetchRequest, POSTRequest } from "@/lib/api";
import { createShowUrl, getMoviesUrl } from "@/constants/apiConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CreateShowPage() {
  const getMovies = async () => {
    const response = await FetchRequest(getMoviesUrl);

    return response as {
      success?: string;
      message?: string;
      movies?: Array<Movie>;
    };
  };

  const { data } = useQuery<{
    success?: string;
    message?: string;
    movies?: Array<Movie>;
  }>({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  console.log(data, "data");

  const movies = data?.movies ?? [];

  const [movieId, setMovieId] = useState("");
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");
  const [capacity, setCapacity] = useState("");

  const createShow = async (data: CreateShowInput) => {
    const response = await POSTRequest(createShowUrl, data);
    return response as { success?: boolean; message?: string };
  };

  const createShowMutation = useMutation({
    mutationKey: ["createShow"],
    mutationFn: createShow,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        return;
      }

      toast.error(data.message);
    },
    onError: () => {
      toast.error("Unexpected error occured");
    },
  });

  const handleSubmit = () => {
    if (!movieId || !showDate || !showTime || !capacity) {
      alert("Please fill in all fields");
      return;
    }

    const startTime = new Date(`${showDate}T${showTime}`);

    const data = {
      movieId,
      startTime,
      capacity: parseInt(capacity),
    };

    createShowMutation.mutate(data);
  };

  return (
    <div
      className="w-full max-w-md bg-gray-950 border-[0.1px] border-gray-700 rounded-2xl
    drop-shadow-md drop-shadow-blue-900"
    >
      <div className="bg-slate-900 px-6 py-4 rounded-t-2xl">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Film className="mr-2" size={20} />
          Schedule Movie Showing
        </h2>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* Movie Selection */}
        <div className="space-y-2">
          <label
            htmlFor="movie"
            className="block text-sm font-medium text-gray-300"
          >
            Select Movie
          </label>
          <select
            id="movie"
            value={movieId}
            onChange={(e) => {
              setMovieId(e.target.value);
            }}
            className="text-sm w-full px-4 py-2 bg-slate-900 border border-gray-600 rounded-md text-white transition-all focus:outline-none"
          >
            <option value="">-- Select a movie --</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        {/* Show Date */}
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-300 flex items-center"
          >
            <Calendar className="mr-2" size={16} />
            Show Date
          </label>
          <input
            type="date"
            id="date"
            value={showDate}
            onChange={(e) => setShowDate(e.target.value)}
            className="text-sm w-full px-4 py-2 bg-slate-900 border border-gray-600 rounded-md text-white 
            transition-all"
          />
        </div>

        {/* Show Time */}
        <div className="space-y-2">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-300 flex items-center"
          >
            <Clock className="mr-2" size={16} />
            Show Time
          </label>
          <input
            type="time"
            id="time"
            value={showTime}
            onChange={(e) => setShowTime(e.target.value)}
            className="text-sm w-full px-4 py-2 bg-slate-900 border border-gray-600 rounded-md text-white transition-all"
          />
        </div>

        {/* Capacity */}
        <div className="space-y-2">
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-300 flex items-center"
          >
            <Users className="mr-2" size={16} />
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="text-sm w-full px-4 py-2 bg-slate-900 border border-gray-600 rounded-md text-white transition-all"
            placeholder="Enter maximum seats"
          />
        </div>

        {/* Form Actions */}
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 "
          >
            Schedule Show
          </button>
        </div>
      </div>
    </div>
  );
}
