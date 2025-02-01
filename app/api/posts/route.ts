import connectToDatabase from '@/lib/mongodb/mongodb';
import { Post } from '@/models/post.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const data = await req.json();

        const slug = data.title
            .split(' ')
            .join('-')
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, '');

        const post = await Post.create({
            title: data.title,
            content: data.content,
            image: data.image,
            category: data.category,
            slug,
        });
        await post.save();

        return NextResponse.json({
            message: "Post created successfully",
            post
        });

    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Error creating post",
                details: (error as Error).message
            },
            { status: 500 }
        );
    }
}