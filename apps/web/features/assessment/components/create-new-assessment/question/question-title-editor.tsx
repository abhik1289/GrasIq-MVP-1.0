"use client";

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { Button } from "@workspace/ui/components/button";
import { Editor } from "@tiptap/core";
import Subscript from "@tiptap/extension-subscript";
import { EditorContent, EditorContext } from "@tiptap/react";
import React from "react";
import { Label } from "recharts";

function QuestionTitleEditor({ editor }: { editor: Editor }) {
  return (
    <div>
      <EditorContext.Provider value={{ editor }}>
        <Label className="mb-2 mt-4">Description</Label>
        <ToolbarBox editor={editor} />
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}

function ToolbarBox({ editor }: { editor: Editor }) {
  return (
    <div className="flex">
      <Toolbar>
        <ToolbarGroup>
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </ToolbarGroup>

        <ToolbarGroup>
          <Button
            type="button"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            B
          </Button>
          {/* <MarkButton
          editor={editor}
          type="bold"
          text="Bold"
          hideWhenUnavailable={true}
          showShortcut={true}
          onToggled={() => console.log("Mark toggled!")}
        /> */}
          {/* <MarkButton type="italic" />
        <MarkButton type="underline" />
        <MarkButton type="subscript" />
        <MarkButton type="superscript" /> */}
          {/* <MarkButton type="strikethrough" /> */}
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
}

export default QuestionTitleEditor;
