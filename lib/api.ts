/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const POSTRequest = async (url: string, data: any) => {
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response) {
    throw new Error("No response from server");
  }

  return response.data;
};
