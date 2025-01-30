import PostCard from '@/components/PostCard';

interface RecentPostsProps {
  limit: number;
}

export default async function RecentPosts({ limit }: RecentPostsProps) {
  let posts = null;
  
  try {
    const result = await fetch(`${process.env.URL}/api/posts/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ limit, order: 'desc' }),
      cache: 'no-store',
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.error('Error getting posts:', error);
  }

  return (
    <div className='flex flex-col justify-center items-center mb-5'>
      <h1 className='text-xl mt-5'>Recent articles</h1>
      <div className='flex flex-wrap gap-5 mt-5 justify-center'>
        {posts?.map((post: { _id: string; slug: string; image: string; title: string; category: string }) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}