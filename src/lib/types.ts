import { Doc } from "../../convex/_generated/dataModel";

export type Document = Doc<"documents">;

export type User = { id: string; name: string; avatar: string; color: string };
