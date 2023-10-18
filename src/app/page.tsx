'use client'
import { Card, Typography } from '@material-tailwind/react';
import clsx from 'clsx';
import { fetchPosts } from '@/api/blog'
export const metadata = {
    title: 'Gorest Fetch Api',
    description: 'test description',
};

export default async function Page() {
    const posts = await fetchPosts();
    return (
        <div className={clsx('flex flex-col w-full')}>
            <div className="mx-auto max-w-screen-md py-12">
                <Card className="mb-12 overflow-hidden">
                    <img
                        alt="nature"
                        className="h-[32rem] w-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
                    />
                    <div className="p-6">
                        {posts.map((post) => (
                            <div key={post.id} className="mb-4">
                                <Typography color="gray" variant="h2">
                                    {post.user_id}
                                </Typography>
                                <Typography color="gray" variant="h2">
                                    {post.title}
                                </Typography>
                                <Typography color="gray" variant="h2">
                                    {post.body}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
