/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const POSTRequest = async (url: string, data: any, headers?: any) => {
  const response = await axios.post(url, data, {
    headers: headers
      ? headers
      : {
          "Content-Type": "application/json",
        },
    withCredentials: true,
  });

  if (!response) {
    throw new Error("No response from server");
  }

  return response.data;
};

export const FetchRequest = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  if (!response) {
    throw new Error("No response from server");
  }

  return response.data;
};
