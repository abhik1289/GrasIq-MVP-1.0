import { Card } from "@workspace/ui/components/card";
import React from "react";
import {
  Plus,
  FilePlus,
  ListTodo,
  BookOpen,
  PencilLine,
  Headphones,
  Mic,
  History,
  FileClock,
  Music,
  Image,
} from "lucide-react";
import ToolbarButton from "./toolbar-button";

function LeftSideBar() {
  const toolbar = [
    {
      id: 1,
      title: "Section",
      items: [
        {
          id: 1,
          name: "Add",
          icon: Plus, // ➕ Add section
        },
        {
          id: 2,
          name: "Existing",
          icon: FilePlus, // 📄 Add existing section
        },
      ],
    },
    {
      id: 2,
      title: "Question",
      items: [
        {
          id: 1,
          name: "Mcq",
          icon: ListTodo, // ✅ Checklist type
        },
        {
          id: 2,
          name: "Reading",
          icon: BookOpen, // 📖 Reading
        },
        {
          id: 3,
          name: "Writting",
          icon: PencilLine, // ✍️ Writing
        },
        {
          id: 4,
          name: "Listening",
          icon: Headphones, // 🎧 Listening
        },
        {
          id: 5,
          name: "Speaking",
          icon: Mic, // 🎤 Speaking
        },
        {
          id: 6,
          name: "Existing", //exitsing old question
          icon: FileClock, // 🎤 Speaking
        },
      ],
    },
    {
      id: 3,
      title: "File",
      items: [
        {
          id: 1,
          name: "Image",
          icon: Image,
        },
        {
          id: 2,
          name: "Audio",
          icon: Music,
        },
      ],
    },
  ];

  return (
    <div className="w-2/12">
      <Card className="p-4 w-[115px] flex justify-center">
        {toolbar.map((group) => (
          <div key={group.id}>
            <h3>{group.title}</h3>
            <div className="button_box flex flex-wrap gap-2 mt-2">
              {group.items.map((item) => (
                <ToolbarButton key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default LeftSideBar;
