
export interface Item {
    id: number;
    title: string;
    description: string;
    author: string;
    image: string;
    category: string;
    banner_url: string;
    repo_url: string;
    dl_url: string;
    created_at: string;
}

export type ItemType = "templates" | "components";