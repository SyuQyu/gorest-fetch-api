'use client'

import { createContext, useContext, useState, useEffect } from "react";

interface BlogsContextType {
    getBlogs: any;
    fetchPostDetails: (postId: string) => Promise<{ post: Post, comments: Comment[], user: User }>;
}

export const BlogsContext = createContext<BlogsContextType>({
    getBlogs: [],
    fetchPostDetails: async () => ({ post: {} as Post, comments: [] as Comment[], user: {} as User }),
});

export const useBlogs = () => useContext(BlogsContext);

export const BlogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [blogs, setBlogs] = useState<Post[]>([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://gorest.co.in/public/v2/posts');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async function fetchPostDetails(postId: string): Promise<{ post: Post, comments: Comment[], user: User }> {
        try {
            const [postResponse, commentsResponse] = await Promise.all([
                fetch(`https://gorest.co.in/public/v2/posts/${postId}`, { cache: 'no-store' }),
                fetch(`https://gorest.co.in/public/v2/comments?post_id=${postId}`, { cache: 'no-store' })
            ]);

            const [postData, commentsData] = await Promise.all([
                postResponse.json(),
                commentsResponse.json()
            ]);

            const userResponse = await fetch(`https://gorest.co.in/public/v2/users/${postData.user_id}`, { cache: 'no-store' });
            const userData = await userResponse.json();

            return {
                post: postData,
                comments: commentsData,
                user: userData
            };
        } catch (error) {
            console.log(error);
            return {
                post: {} as Post,
                comments: [] as Comment[],
                user: {} as User
            };
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    const getBlogs = blogs;

    return (
        <BlogsContext.Provider
            value={{ getBlogs, fetchPostDetails }}
        >
            {children}
        </BlogsContext.Provider>
    );
};
