"use client";
import { useForm } from "react-hook-form";
import { LabelInputContainer } from "./createGenre";
import { Label } from "../label";
import { Input } from "../input";
import ImageUpload from "../common/ImageUpload";
import { useState } from "react";
import TagSelectorDropdown from "../common/TagsSelector";
import { FetchRequest, POSTRequest } from "@/lib/api";
import { createMovieUrl, getGenresUrl } from "@/constants/apiConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

type FormValues = {
  title: string;
  description: string;
};

type Genres = Array<{
  id: string;
  name: string;
}>;

export default function CreateMoviePage() {
  const { register, watch } = useForm<FormValues>();
  const [selectedTags, setSelectedTags] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const { title, description } = watch();

  const [posterImage, setposterImage] = useState<File | null>(null);

  const handleImage = (file: File) => {
    console.log(file, "file");
    setposterImage(file);
  };

  const getGenres = async () => {
    const response = await FetchRequest(getGenresUrl);

    return response as { success?: false; message?: string; genres?: Genres };
  };

  const { data: genreResp } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const availableTags = genreResp?.genres ?? [];

  const createMovie = async (data: FormData) => {
    const headers = {};
    const response = await POSTRequest(createMovieUrl, data, headers);
    return response as { success?: string; message?: string };
  };

  const createMovieMutation = useMutation({
    mutationKey: ["createMovie"],
    mutationFn: createMovie,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        return;
      }
      toast.error(data.message);
    },
    onError: () => {
      toast.error("Unknown error creating a movie");
    },
  });

  const handleSubmit = () => {
    // const data: CreateMovieInput = {
    //   title,
    //   description,
    //   posterImage,
    //   genreIds: selectedTags.map((tag) => tag.id),
    // };

    const genreIds = selectedTags.map((tag) => tag.id);
    const formData = new FormData();
    console.log(posterImage, "img");
    formData.append("posterImage", posterImage ?? " ");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genreIds", JSON.stringify(genreIds));

    createMovieMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-10">
        <LabelInputContainer className="max-w-96 space-y-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter title"
            type="text"
            {...register("title")}
          />
        </LabelInputContainer>

        <LabelInputContainer className="max-w-96 space-y-4">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Enter description"
            type="text"
            {...register("description")}
          />
        </LabelInputContainer>
      </div>

      <ImageUpload onImageChange={handleImage} />

      <TagSelectorDropdown
        availableTags={availableTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      <div
        onClick={handleSubmit}
        className="text-gray-100 bg-gray-900 py-3 rounded-lg max-w-48 flex justify-center cursor-pointer"
      >
        {createMovieMutation.isPending ? "Creating a movie" : "Create a movie"}
      </div>
    </div>
  );
}
