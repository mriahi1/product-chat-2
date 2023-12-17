import { Category } from "./Category";

export interface ChatMessage {
    sender: "user" | "bot";
    content: string;
    category?: Category;
  }