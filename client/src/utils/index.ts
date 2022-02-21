/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios, { AxiosError } from "axios";

// eslint-disable-next-line import/prefer-default-export
export const getErrorMessage = (error: AxiosError | Error): string => {
  if (axios.isAxiosError(error)) return error.response?.data.message || error.message;

  return error?.message || "An unknown error occurred.";
};
