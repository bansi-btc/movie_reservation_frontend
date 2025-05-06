"use client";
import { useForm } from "react-hook-form";
import { Label } from "../label";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { POSTRequest } from "@/lib/api";
import { createGenreUrl } from "@/constants/apiConstants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type FormValues = {
  genre: string;
};

export default function CreateGenrePage() {
  const { register, handleSubmit } = useForm<FormValues>();

  const handleCreateGenre = async (data: { name?: string }) => {
    const token = Cookies.get("token");
    console.log(token);
    const response = await POSTRequest(createGenreUrl, data);
    return response as { success?: boolean; message?: string };
  };

  const createGenreMutation = useMutation({
    mutationFn: handleCreateGenre,
    mutationKey: ["create-genre"],
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message ?? "Genre created successfully");
        return;
      }

      toast.error(data.message);
    },
    onError: (error?: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error?.response?.data?.message ?? "Login failed unexpectedly"
      );
    },
  });

  const onSubmit = (data: FormValues) => {
    createGenreMutation.mutate({ name: data.genre });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-start"
      >
        <LabelInputContainer className="max-w-96 space-y-4">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            placeholder="Enter genre"
            type="text"
            {...register("genre")}
          />
        </LabelInputContainer>

        <button
          type="submit"
          className="text-sm bg-blue-950 py-2 px-6 rounded-md"
        >
          {createGenreMutation.isPending ? "Creating Genre" : "Create genre"}
        </button>
      </form>
    </div>
  );
}

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col", className)}>{children}</div>
  );
};
