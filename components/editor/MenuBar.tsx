'use client';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Code, Quote, Undo, Redo } from 'lucide-react';

import { Editor } from '@tiptap/react';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="border border-b-0 rounded-t-lg bg-gray-50 p-2 flex gap-2 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="p-2 rounded"
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="p-2 rounded"
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="p-2 rounded"
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="p-2 rounded"
      >
        <ListOrdered className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="p-2 rounded"
      >
        <Heading1 className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="p-2 rounded"
      >
        <Heading2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="p-2 rounded"
      >
        <Code className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="p-2 rounded"
      >
        <Quote className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded"
      >
        <Undo className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded"
      >
        <Redo className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MenuBar;