/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosError } from "axios";
import { enc, SHA256 } from "crypto-js";

// eslint-disable-next-line import/prefer-default-export
export const getErrorMessage = (error: AxiosError | Error): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (axios.isAxiosError(error)) return error.response?.data.message || error.message;

  return error?.message || "An unknown error occurred.";
};

export const hash = (stringToHash: string): string => SHA256(stringToHash).toString(enc.Base64);
