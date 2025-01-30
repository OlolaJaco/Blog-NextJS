import CallToAction from "@/components/CallToAction";
import RecentPosts from '@/components/RecentPosts';
import Link from "next/link";
interface Params {
  slug: string;
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  let post = null;
  try {
    const result = await fetch(process.env.URL + "/api/posts/get", {
      method: "POST",
      body: JSON.stringify({ slug: resolvedParams.slug }),
      cache: "no-store",
    });
    const data = await result.json();
    post = data.posts[0];
  } catch (error) {
    post = { title: "Failed to load post" };
  }
  if (!post || post.title === "Failed to load post") {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  }
  return (
    <main className="bg-base-100 text-base-content">
      <section className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen bg-base-100">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>
        <Link
          href={`/search?category=${post && post.category}`}
          className="self-center mt-5"
        >
          <button className="btn btn-gray btn-pill btn-xs">
            {post && post.category}
          </button>
        </Link>
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {post && (post?.content?.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        ></div>
        <div className="max-w-4xl mx-auto w-full">
          <CallToAction />
        </div>
        <RecentPosts limit={3} />
      </section>
    </main>
  );
}
