import axios, { AxiosError } from "axios";
import { IContactsResponse, IDeleteResponse, Resource } from "../types/types";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1";

export const getContacts = async () => {
  try {
    const response = await axios.get<IContactsResponse>(
      `${BASE_URL}/contacts`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn",
        },
        params: {
          sort: "created:desc",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export const getContact = async (id: string) => {
  try {
    const response = await axios.get<IContactsResponse>(
      `${BASE_URL}/contact/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export const updateContact = async (id: string, tags: string[]) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/contacts/${id}/tags`,
      { tags },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export const createContact = async (data: unknown) => {
  try {
    const response = await axios.post<Resource>(`${BASE_URL}/contact`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export const deleteContact = async (id: string) => {
  try {
    const response = await axios.delete<IDeleteResponse>(
      `${BASE_URL}/contact/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
