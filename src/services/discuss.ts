import api from "./api"; // Your existing Axios instance

export interface Author {
    _id: string;
    firstname: string;
    lastname: string;
    avatarUrl?: string;
}

export interface Post {
    _id: string;
    title: string;
    content: string;
    author: Author;
    category: string;
    tags: string[];
    upvotes: string[];
    voteCount: number; // Virtual field we added in backend
    views: number;
    commentCount: number;
    isHot: boolean;
    createdAt: string;
}

export interface Comment {
    _id: string;
    content: string;
    author: Author;
    createdAt: string;
    parentId?: string;
}

export const fetchPosts = async (params: { category?: string; search?: string; tag?: string; page?: number }) => {
    // Converts { category: "All Topics" } -> {} to fetch everything
    const queryParams: any = { ...params };
    if (queryParams.category === "All Topics") delete queryParams.category;

    const response = await api.get<Post[]>("/discuss", { params: queryParams });
    return response.data;
};

export const createPost = async (data: { title: string; content: string; category: string; tags: string[] }) => {
    const response = await api.post<Post>("/discuss", data);
    return response.data;
};

export const toggleVote = async (postId: string) => {
    const response = await api.put<{ upvotes: number }>(`/discuss/${postId}/vote`);
    return response.data;
};

// Note: Your router has this AFTER 'authenticate', so the user must be logged in to view comments.
export const fetchComments = async (postId: string) => {
    const response = await api.get<{ comments: Comment[] }>(`discuss/${postId}/comments`);
    return response.data; // Assuming your controller returns { comments: [...] }
};

export const addComment = async (postId: string, content: string, parentId?: string) => {
    const response = await api.post<Comment>(`discuss/${postId}/comments`, { content, parentId });
    return response.data;
}