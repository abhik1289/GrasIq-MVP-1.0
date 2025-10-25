"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";

import {
  Bold,
  Italic,
  Highlighter,
  Underline as UnderlineIcon,
  Pilcrow,
  List,
  ListOrdered,
} from "lucide-react";

export default function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        // bulletList: false,
        // orderedList: false,
        // listItem: false,
      }),
      Highlight,
      Underline,
      BulletList,
      OrderedList,
      Paragraph,
    ],
    content: "",
  });

  if (!editor) return null;

  return (
    <div className="border p-4 rounded shadow space-y-4 mt-2">
      {/* Toolbar with Lucide Icons */}
      <div className="flex gap-2 border-b pb-2">
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold size={18} />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic size={18} />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
        >
          <Highlighter size={18} />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <UnderlineIcon size={18} />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
        >
          <Pilcrow size={18} />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List size={18} />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered size={18} />
        </IconButton>
      </div>

      {/* Editor */}
      <EditorContent
      // inpu
        className="min-h-[150px] p-2 rounded border border-gray-300 focus:outline-none"
        editor={editor}
      />
    </div>
  );
}

function IconButton({
  onClick,
  children,
  active,
}: {
  onClick: () => void;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 ${
        active ? "bg-gray-200 text-blue-600" : ""
      }`}
    >
      {children}
    </button>
  );
}
