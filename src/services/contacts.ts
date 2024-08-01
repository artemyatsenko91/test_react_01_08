import axios from "axios";
import { Resource, Root } from "../types/types";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1";
// axios.defaults.url = BASE_URL;

export const getContacts = async () => {
  const response = await axios.get<Root>(`${BASE_URL}/contacts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn",
    },
    params: {
      sort: "created:desc",
    },
  });
  return response.data;
};

export const createContact = async (data: unknown) => {
  const response = await axios.post<Resource>(`${BASE_URL}/contact`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn",
    },
  });
  return response.data;
};

export const deleteContact = async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/contact${id}`,  {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn",
      },
    });
    return response.data;
  };
