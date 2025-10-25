"use client";

import React from "react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { EditorContext, useEditor } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
// import content from "@/components/tiptap-templates/simple/data/content.json";
import { EditorContent } from "@tiptap/react";
import { Label } from "@workspace/ui/components/label";
// import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

import { MarkButton } from "@/components/tiptap-ui/mark-button";

import { Spacer } from "@/components/tiptap-ui-primitive/spacer";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import { HeadingButton } from "@/components/tiptap-ui/heading-button";
import { ListButton } from "@/components/tiptap-ui/list-button";
// import "@/components/tiptap-templates/simple/simple-editor.scss"

function SectionDescriptionTextEditor({ editor }: { editor: any }) {
  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        {/* <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar> */}
        <Label className="mb-2 mt-4">Description</Label>
        <ToolbarBox editor={editor} />
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content "
        />
      </EditorContext.Provider>
    </div>
  );
}

function ToolbarBox({ editor }: { editor: any }) {
  return (
    <div className="flex">
      <Toolbar
        className="shadow-2xs border border-slate-100 rounded-t-md"
        variant="fixed"
      >
        <Spacer />

        <ToolbarGroup>
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </ToolbarGroup>

        <ToolbarSeparator />
        <ToolbarGroup>
          <HeadingButton editor={editor} level={1} hideWhenUnavailable={true} />
          <HeadingButton editor={editor} level={2} hideWhenUnavailable={true} />
          <HeadingButton editor={editor} level={3} hideWhenUnavailable={true} />
          <HeadingButton editor={editor} level={4} hideWhenUnavailable={true} />
          {/* <TextButton

            editor={editor}
            text="Text"
            hideWhenUnavailable={true}
            showShortcut={true}
            onToggled={() => console.log("Converted to text!")}
          /> */}
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <ListButton
            editor={editor}
            className="cursor-pointer"
            type="bulletList"
            hideWhenUnavailable={true}
          />
          <ListButton
            className="cursor-pointer"
            editor={editor}
            type="orderedList"
            hideWhenUnavailable={true}
          />
        </ToolbarGroup>
        <ToolbarSeparator />

        <ToolbarGroup>
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          {/* <MarkButton type="strike" />
            <MarkButton type="code" /> */}
          <MarkButton type="underline" />
          {/* {!isMobile ? (
              <ColorHighlightPopover />
              ) : (
                <ColorHighlightPopoverButton onClick={onHighlighterClick} />
            )}
            {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />} */}
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* <ToolbarGroup>
            <MarkButton type="superscript" />
            <MarkButton type="subscript" />
          </ToolbarGroup> */}

        <ToolbarSeparator />

        {/* <ToolbarGroup>
            <TextAlignButton align="left" />
            <TextAlignButton align="center" />
            <TextAlignButton align="right" />
            <TextAlignButton align="justify" />
          </ToolbarGroup> */}

        <ToolbarSeparator />

        {/* <ToolbarGroup>
            <ImageUploadButton text="Add" />
            </ToolbarGroup> */}

        <Spacer />

        {/* {isMobile && <ToolbarSeparator />} */}

        {/* <ToolbarGroup>
            <ThemeToggle />
          </ToolbarGroup> */}
        {/* </> */}
      </Toolbar>
    </div>
  );
}

export default SectionDescriptionTextEditor;
