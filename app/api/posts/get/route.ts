import { Post } from '@/models/post.model';
import connectToDatabase from '@/lib/mongodb/mongodb';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await connectToDatabase();
  
  try {
    // Parse the JSON body from the request
    const data = await request.json();
    
    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(data.userId && { userId: data.userId }),
      ...(data.category &&
        data.category !== 'null' &&
        data.category !== 'undefined' && { category: data.category }),
      ...(data.slug && { slug: data.slug }),
      ...(data.postId && { _id: data.postId }),
      ...(data.searchTerm && {
        $or: [
          { title: { $regex: data.searchTerm, $options: 'i' } },
          { content: { $regex: data.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return Response.json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    console.error('Error getting posts:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}