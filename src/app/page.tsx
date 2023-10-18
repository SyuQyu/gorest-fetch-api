'use client'
import { Button, Card, Typography } from '@material-tailwind/react';
import clsx from 'clsx';
import { fetchPosts } from '@/api/blog'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback, SimpleCard } from '@/components/common';

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [displayedPosts, setDisplayedPosts] = useState<number>(8);

    async function fetchData() {
        const data = await fetchPosts();
        if (data) setPosts(data);
    }

    const loadMore = () => {
        setDisplayedPosts((prev) => prev + 8);
    };


    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className={clsx('flex flex-col w-full')}>
            <div className="flex items-center justify-center flex-col w-full gap-24">
                <div className="relative h-full w-full">
                    <ImageWithFallback
                        priority={true}
                        width={0}
                        height={0}
                        sizes='10vw'
                        className='w-full min-h-[600px] md:max-h-[500px] rounded-lg object-cover' src='/bg.jpg' alt="" />
                    <div className="absolute inset-0 grid h-full w-full place-items-center md:py-0 py-6">
                        <div className="w-3/4 text-center md:w-2/4">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                Go REST API
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                <span className='font-bold'>GoREST</span> offers free REST API for testing, with fake data on users, posts, comments, products, etc. Accessible via standard HTTP methods (GET, POST, PUT, PATCH, DELETE). Create an account for an access token and authentication.
                            </Typography>
                            <Link href='https://gorest.co.in/'>
                                <Button size="lg" color="white" className='w-[50%]'>
                                    Explore
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div id='blog-post' className='flex flex-col justify-center items-center gap-8'>
                    <Typography variant="h2" color="blue-gray" className="text-center">
                        Blog Post
                    </Typography>
                    <div className="flex flex-wrap justify-center h-full items-stretch gap-8 sm:px-10 px-2 w-full mb-12 sm:mb-6" >
                        {
                            posts ? (
                                posts.slice(0, displayedPosts).map((post) => (
                                    <SimpleCard data-aos="zoom-in-up" data-aos-duration="1500" className='sm:w-96 w-[20rem] justify-between shadow-xl border-y-4 border-black' key={post.id} data={post} />
                                ))
                            ) : null
                        }
                    </div>
                    {displayedPosts < posts.length && (
                        <Button  onClick={loadMore} className="bg-black text-white w-1/4">Read More</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
