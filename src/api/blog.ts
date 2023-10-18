interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://gorest.co.in/public/v2/posts');
    const data = await response.json();
    return data;
}

export { fetchPosts };
