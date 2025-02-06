import PostCard from '@/components/PostCard';

interface RecentPostsProps {
  limit: number;
}

export default async function RecentPosts({ limit }: RecentPostsProps) {
  let posts = null;

  try {
    // Fetch recent posts from the API
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ limit, order: 'desc' }),
      cache: 'no-store',
    });

    // Check if the response is OK
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    // Parse the JSON response
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error getting posts:', error);
  }

  return (
    <div className='flex flex-col justify-center items-center mb-5'>
      <h1 className='text-xl mt-5'>Recent articles</h1>
      <div className='flex flex-wrap gap-5 mt-5 justify-center'>
        {/* Render PostCard components for each post */}
        {posts?.map((post: { _id: string; slug: string; image: string; title: string; category: string }) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}