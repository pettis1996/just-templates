
export interface Item {
    id: number;
    title: string;
    description: string;
    author: string;
    image: string;
    category: string;
}

export type ItemType = "templates" | "components";