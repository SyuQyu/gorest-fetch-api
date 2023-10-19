'use client'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useBlogs } from '@/context/blogs/store';

export default function Page(slug: any) {
    const { fetchPostDetails } = useBlogs();
    const [data, setData] = useState<{ post: Post | null, comments: Comment[] | null, user: User | null }>({
        post: null,
        comments: null,
        user: null
    });
    const pages = slug?.params?.slug !== undefined ? slug.params.slug[0] : 1;
    async function fetchData() {
        const postDetails = await fetchPostDetails(pages as string)
        setData({
            post: postDetails.post,
            comments: postDetails.comments,
            user: postDetails.user
        });
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={clsx('flex flex-col w-full')}>
            {data.post && (
                <div className="bg-white rounded-lg shadow-2xl p-6 mb-6 ">
                    <h1 className="text-2xl font-bold mb-2">{data.post.title}</h1>
                    <p className="text-gray-700 mb-4">{data.post.body}</p>
                    <p className="text-gray-500">Posted by {data.user?.name ? data.user?.name : 'No Name'}</p>
                </div>
            )}
            {data.comments && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-2">Comments</h2>
                    {
                        data.comments.length > 0 ?
                            data.comments.map(comment => (
                                <div key={comment.id} className="mb-4">
                                    <p className="text-gray-700">{comment.body}</p>
                                    <p className="text-gray-500">Comment by {comment.name}</p>
                                </div>
                            ))
                            :
                            <p className="text-gray-700">No Comments</p>
                    }
                </div>
            )}
        </div>
    );
}

