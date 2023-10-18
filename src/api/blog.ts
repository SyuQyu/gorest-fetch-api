const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function fetchPosts(): Promise<Post[]> {
    try {
        const response = await fetch('https://gorest.co.in/public/v2/posts');
        const data = await response.json();
        return data;
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

async function createUserPost(userId: string, title: string, body: string): Promise<Post> {
    try {
        const response = await fetch('https://gorest.co.in/public/v2/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`
            },
            body: JSON.stringify({
                user_id: userId,
                title,
                body
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {} as Post;
    }
}

async function createPostComment(postId: string, name: string, email: string, body: string): Promise<Comment> {
    try {
        const response = await fetch('https://gorest.co.in/public/v2/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`
            },
            body: JSON.stringify({
                post_id: postId,
                name,
                email,
                body
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {} as Comment;
    }
}

export { fetchPosts, fetchPostDetails, createUserPost, createPostComment };
