import type { Album, Photo, User } from "./types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getAlbums(
  page: number = 1,
  limit: number = 10
): Promise<{ data: Album[]; total: number }> {
  const response = await fetch(
    `${API_BASE_URL}/albums?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  const total = Number(response.headers.get("X-Total-Count") || "0");
  const data = await response.json();

  return { data, total };
}

export async function getAlbum(id: string): Promise<Album> {
  const response = await fetch(`${API_BASE_URL}/albums/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch album with id ${id}`);
  }
  return response.json();
}

export async function getUserAlbums(userId?: string): Promise<Album[]> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/albums`);
  if (!response.ok) {
    throw new Error(`Failed to fetch albums for user ${userId}`);
  }
  return response.json();
}

// Photos
export async function getPhotos(albumId: string | undefined): Promise<Photo[]> {
  const response = await fetch(
    `${API_BASE_URL}/photos?_end=10&_start=0&albumId=${albumId}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch photos for album ${albumId}`);
  }
  return response.json();
}

// Users
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function getUser(id: string | undefined): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with id ${id}`);
  }
  return response.json();
}
