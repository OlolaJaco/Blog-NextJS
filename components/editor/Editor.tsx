'use client'; 
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';

const Editor = ({ onChange, content = '' }: { onChange: (html: string) => void; content?: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none h-72 p-4 border rounded-b-lg focus:outline-none overflow-y-auto'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  return (
    <div className="min-h-[200px]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;