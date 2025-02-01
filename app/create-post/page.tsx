"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/ImageUpload";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    image: "",
    content: "",
  });

  const handleImageUpload = (url: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, image: url }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.title?.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.content?.trim()) {
      setError("Content is required");
      return;
    }
    if (!formData.image) {
      setError("Please upload an image");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Failed to create post');
      }

      router.push(`/post/${data?.post?.slug}`);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong in handling submit');
    } finally {
      setLoading(false);
    }
    console.log(formData);
  };

  return (
    <section className="bg-base-100 text-base-content">
      <div className="p-3 max-w-3xl mx-auto min-h-screen ">
        {error && (

          <div role="alert" className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </div>
        )}

        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a post
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <input
              type="text"
              placeholder="Title"
              required
              id="title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input input-bordered flex-1"
            />
            <select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="select select-bordered"
            >
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </select>
          </div>
          <div className="flex gap-4 items-center justify-center border-4 border-teal-500 border-dotted p-3">
            <ImageUpload
              onUploadSuccess={handleImageUpload}
              value={formData.image}
            />
          </div>

          {/* editor comes here */}
          <Editor
            onChange={(html) => setFormData({ ...formData, content: html })}
            content={formData.content}
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-neutral"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
