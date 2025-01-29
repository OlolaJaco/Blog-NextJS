"use client";
import ImageUpload from "@/components/ImageUpload";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const page = () => {
  const [postContent, setPostContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (url: string) => {
    console.log('Image uploaded successfully:', url);
    setImageUrl(url);
    
    // You can parse the URL to get the public ID
    const publicId = url.split('/').pop()?.split('.')[0];
    console.log('Cloudinary public ID:', publicId);
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen bg-base-100 text-base-content">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="input input-bordered flex-1"
          />
          <select className="select select-bordered">
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-center border-4 border-teal-500 border-dotted p-3">
          <ImageUpload 
          // onUploadSuccess={setImageUrl}
          onUploadSuccess={handleImageUpload} 
          value={imageUrl} 
          />
        </div>

        {/* <div className="alert alert-error">Error message</div>
        <img src="#" alt="upload" className="w-full h-72 object-cover" /> */}

        {/* editor comes here */}
        <Editor
          onChange={(html) => setPostContent(html)}
          content={postContent}
        />

        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </form>
    </div>
  );
};

export default page;
