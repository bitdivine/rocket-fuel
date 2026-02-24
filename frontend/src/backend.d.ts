import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface ComicEntry {
    id: Id;
    title: string;
    link?: string;
    createdAt: Timestamp;
    description: string;
    series: string;
    imageUrl?: string;
}
export interface CreateRequest {
    title: string;
    link?: string;
    description: string;
    series: string;
    imageUrl?: string;
}
export type Id = bigint;
export interface backendInterface {
    createComicEntry(request: CreateRequest): Promise<ComicEntry>;
    getComicEntry(id: Id): Promise<ComicEntry>;
    listComicEntries(): Promise<Array<ComicEntry>>;
}
