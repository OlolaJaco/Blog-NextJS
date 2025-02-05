'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PostCard from '@/components/PostCard';

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  slug: string;
  image: string;
}

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams?.toString() || '');
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    // Update sidebar data with URL parameters
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
      }));
    }

    // Fetch posts based on URL parameters
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch('/api/posts/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit: 9,
          order: sortFromUrl || 'desc',
          category: categoryFromUrl || 'uncategorized',
          searchTerm: searchTermFromUrl,
        }),
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sidebarData.searchTerm) {
      sidebarData.searchTerm = '';
    }
    const urlParams = new URLSearchParams(searchParams?.toString() || '');
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    router.push(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(searchParams?.toString() || '');
    urlParams.set('startIndex', startIndex.toString());
    const res = await fetch('/api/post/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 9,
        order: sidebarData.sort,
        category: sidebarData.category,
        searchTerm: sidebarData.searchTerm,
        startIndex,
      }),
    });
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='flex flex-col md:flex-row bg-base-100 text-base-content'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
          <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className='flex items-center gap-2'>
              <label className='whitespace-nowrap font-semibold'>
                Search Term:
              </label>
              <input
                placeholder='Search...'
                id='searchTerm'
                type='text'
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className='input input-bordered'
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Sort:</label>
              <select onChange={handleChange} id='sort' className='select select-bordered'>
                <option value='desc'>Latest</option>
                <option value='asc'>Oldest</option>
              </select>
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Category:</label>
              <select onChange={handleChange} id='category' className='select select-bordered'>
                <option value='uncategorized'>Uncategorized</option>
                <option value='reactjs'>React.js</option>
                <option value='nextjs'>Next.js</option>
                <option value='javascript'>JavaScript</option>
              </select>
            </div>
            <button type='submit' className='btn btn-outline btn-primary'>
              Apply Filters
            </button>
          </form>
        </div>
        <div className='w-full'>
          <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
            Posts results:
          </h1>
          <div className='p-7 flex flex-wrap gap-4'>
            {!loading && posts.length === 0 && (
              <p className='text-xl text-gray-500'>No posts found.</p>
            )}
            {loading && <p className='text-xl text-gray-500'>Loading...</p>}
            {!loading &&
              posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
            {showMore && (
              <button
                onClick={handleShowMore}
                className='text-teal-500 text-lg hover:underline p-7 w-full'
              >
                Search For More
              </button>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}