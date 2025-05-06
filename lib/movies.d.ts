type Movie = {
  id: string;
  title?: string;
  description?: string;
  posterUrl?: string;
  genres?: Array<{
    id?: string;
    name?: string;
  }>;
};

type CreateShowInput = {
  movieId: string;
  startTime: Date;
  capacity: number;
};
