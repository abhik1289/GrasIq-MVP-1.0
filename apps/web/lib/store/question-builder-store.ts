import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { v1 as uuidv1 } from "uuid";
import axios from "axios";

const FIRST_SECTION_ID = uuidv1();
const QUESTION_ID = uuidv1();
type IExamBuilder = {
  assessment_id: string;
  name: string;
  description: string;
  duration: number;
  totalMarks: number;
  type: "Company" | "Test";
  published: boolean;
  companyId?: string;
  publishedAt?: Date;
  availabilityStartsAt?: Date;
  availabilityEndsAt?: Date;
  sections: ISections[];
  setExamData: (data: Partial<IExamBuilder>) => void;
  activeSectionId: string;
  setAciveSectionId: (id: string) => void;
};
type QTYPES =
  | "MCQ"
  | "READING"
  | "WRITTING"
  | "CODING"
  | "SPEAKING"
  | "LISTENING";

type IQuestions = {
  questionId: string;
  sectionId: string;
  title: string;
  type: QTYPES;
  options?: IOptions[];
  addQuestion: (sectionId: string, type: QTYPES) => Promise<void>;
};
type ISections = {
  isActive: false;
  section_id: string;
  name: string;
  description: string;
  duration: number;
  order: number;
  totalMarks: number;
  isStar: boolean;
  isSkipable: boolean;
  questions: IQuestions[];
};

type IOptions = {
  optionId: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
};

type ISectionControllers = {
  removeSection: (id: string) => void;
  updateSection: (id: string, data: Partial<ISections>) => void;
  addSection: () => void;
};

const DEFAULT_OPTIONS = [
  {
    optionId: uuidv1(),
    isCorrect: false,
    questionId: QUESTION_ID,
    text: "A. Rahul Dravid",
  },
  {
    optionId: uuidv1(),
    isCorrect: false,
    questionId: QUESTION_ID,
    text: "B. Sourav Ganguly",
  },
  {
    optionId: uuidv1(),
    isCorrect: false,
    questionId: QUESTION_ID,
    text: "C. Virat Kohli",
  },
  {
    optionId: uuidv1(),
    isCorrect: false,
    questionId: QUESTION_ID,
    text: "D. Mahendra Singh Dhoni",
  },
];
const DEFAULT_QUESTION: IQuestions[] = [
  {
    questionId: QUESTION_ID,
    sectionId: FIRST_SECTION_ID,
    title:
      "Who was the captain of the Indian cricket team when India won the ICC Cricket World Cup in 2011?",
    type: "MCQ",
    options: DEFAULT_OPTIONS,
    addQuestion: async (sectionId: string, type: QTYPES) => {
      await axios.post("/api/question", {
        sectionId,
        type,
        questionId: uuidv1(),
      });
    },
  },
];

type IExam = IExamBuilder & ISectionControllers;
const defaultState: Omit<IExam, keyof ISectionControllers> = {
  assessment_id: uuidv1(),
  description: "",
  duration: 30,
  name: "Assessment 1",
  published: false,
  totalMarks: 0,
  type: "Test",
  companyId: undefined,
  publishedAt: undefined,
  availabilityStartsAt: undefined,
  availabilityEndsAt: undefined,
  activeSectionId: FIRST_SECTION_ID,
  sections: [
    {
      section_id: FIRST_SECTION_ID,
      name: "Section 1",
      description: "",
      duration: 0,
      order: 1,
      totalMarks: 0,
      isSkipable: false,
      isStar: false,
      isActive: false,
      questions: DEFAULT_QUESTION,
    },
  ],
  setExamData: () => {},
  setAciveSectionId: () => {},
};

export const UseCreateAssessmentStore = create<IExam>()(
  persist(
    immer((set) => ({
      ...defaultState,
      setExamData: (data) => {
        set((state) => {
          Object.assign(state, data);
        });
      },
      addSection: () => {
        const SECTION_ID = uuidv1();
        set((state) => {
          state.sections.push({
            section_id: SECTION_ID,
            name: `Section ${state.sections.length + 1}`,
            description: "",
            duration: 0,
            order: state.sections.length + 1,
            totalMarks: 0,
            isSkipable: false,
            isStar: false,
            isActive: false,
            questions: DEFAULT_QUESTION,
          });
          state.activeSectionId = SECTION_ID;
        });
      },
      removeSection: (id: string) => {
        // if()
        set((state) => {
          if (state.sections.length > 1) {
            state.sections = state.sections.filter(
              (item) => item.section_id !== id
            );
          } else {
            return;
          }
        });
      },
      updateSection(id, data) {
        set((state) => {
          const section = state.sections.find(
            (section) => section.section_id === id
          );
          if (section) {
            Object.assign(state, data);
          }
        });
      },
      setAciveSectionId: (id: string) => {
        set((state) => {
          state.activeSectionId = id;
        });
      },
    })),
    {
      name: "assessment_builder",
      version: 1,
    }
  )
);
