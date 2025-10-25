import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type ISIDE = "top" | "right" | "bottom" | "left" | "custom";
export type ITYPE = "QUESTION"  | "INVITATION"|"SECTION_LIST";
export type QTypes = "MCQ" | "CODING" | "READING" | "WRITTING";
interface ISheet {
  type: ITYPE;
  open: boolean;
  side: ISIDE;
  questionType: QTypes;
  toogleOpen: (type: ITYPE, questionType?: QTypes, side?: ISIDE) => void;
}

export const useToogleSheet = create<ISheet>()(
  persist(
    immer((set) => ({
      open: false,
      type: "QUESTION",
      side: "right",
      questionType: "MCQ",
      toogleOpen: (type, questionType, side) => {
        set((state) => {
          state.side = side;
          state.questionType = questionType;
          state.type = type;
          state.open = !state.open;
        });
      },
    })),
    {
      name: "sheet",
    }
  )
);

type InvitationSheetType = {
  isEdit: boolean;
  editId?: string;
  open: boolean;
  toogleOpen: (isEdit?: boolean, editId?: string) => void;
  close: () => void;
};

export const useInvitationSheet = create<InvitationSheetType>()(
  persist(
    immer((set) => ({
      isEdit: false,
      open: false,
      close: () => {
        set((state) => {
          state.open = false;
          state.isEdit = false;
          state.editId = undefined;
        });
      },
      toogleOpen: (isEdit, editId) => {
        set((state) => {
          state.isEdit = isEdit;
          state.editId = editId;
          state.open = true;
        });
      },
    })),
    { name: "invitation" }
  )
);


type SectionDialogType = {
  editId:string;
  open: boolean;
  close: () => void;
  toogleDialog: () => void;
}

export const useSectionDialog = create<SectionDialogType>()(
  immer((set) => ({
    open: false,
    editId: "",
    close: () => {
      set((state) => {
        state.open = false;
        state.editId = "";
      });
    },
    toogleDialog: () => {
      set((state) => {
        state.open = !state.open;
      });
    },
  }))
);