import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { v1 as uuidv4 } from "uuid";
import {
  IExam,
  IExamBuilder,
  IQuestionControllers,
  IQuestions,
  ISectionControllers,
} from "./assessment.types";
import {
  DEFAULT_QUESTION,
  FIRST_SECTION_ID,
  QUESTION_ID,
} from "./assessment.defaults";

type IController = ISectionControllers & IQuestionControllers;

const defaultState: Omit<IExam, keyof IController> = {
  assessment_id: uuidv4(),
  isEdit: false,
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
  activeQuestionId: QUESTION_ID,
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
      isNagativeMarks: false,
      optionSerialNo: "A",
      questionSerialNo: "a",
      questions: DEFAULT_QUESTION,
    },
  ],
  setExamData: () => {},
  setAciveSectionId: () => {},
  setActiveQuestionId: () => {},
  setExamName: () => {},
};

export const useCreateAssessmentStore = create<IExam>()(
  persist(
    immer((set) => ({
      ...defaultState,

      setExamData: (data) => {
        set((state) => {
          Object.assign(state, data);
        });
      },

      setExamName: (id: string, title: string) => {
        set((state) => {
          state.name = title;
        });
      },

      addSection: () => {
        const SECTION_ID = uuidv4();
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
            isNagativeMarks: false,
            optionSerialNo: "A",
            questionSerialNo: "a",
            questions: [...DEFAULT_QUESTION],
          });
          state.activeSectionId = SECTION_ID;
        });
      },

      removeSection: (id) => {
        set((state) => {
          if (state.sections.length > 1) {
            state.sections = state.sections.filter(
              (section) => section.section_id !== id
            );
          }
        });
      },

      updateSection: (id, data) => {
        set((state) => {
          const section = state.sections.find((s) => s.section_id === id);
          if (section) {
            Object.assign(section, data);
          }
        });
      },

      setAciveSectionId: (id) => {
        set((state) => {
          state.activeSectionId = id;
        });
      },

      setActiveQuestionId: (id) => {
        set((state) => {
          state.activeQuestionId = id;
        });
      },

      addQuestion: (sectionId, data) => {
        const questionId = uuidv4();
        set((state) => {
          const section = state.sections.find(
            (s) => s.section_id === sectionId
          );
          if (section) {
            section.questions.push({
              questionId,
              type: "MCQ",
              title: data.title,
              sectionId,
              options: data.options,
            });

            // ✅ Send to DB here
            fetch("/api/questions", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                questionId,
                title: data.title,
                type: "MCQ",
                sectionId,
                options: data.options,
              }),
            }).catch((e) => console.error("Failed to add question", e));
          }
        });
      },

      removeQuestion: (sectionId, questionId) => {
        set((state) => {
          const section = state.sections.find(
            (s) => s.section_id === sectionId
          );
          if (section) {
            section.questions = section.questions.filter(
              (q) => q.questionId !== questionId
            );
          }
        });
      },

      updateQuestion: (sectionId, questionId, data) => {
        set((state) => {
          const section = state.sections.find(
            (s) => s.section_id === sectionId
          );
          if (section) {
            const question = section.questions.find(
              (q) => q.questionId === questionId
            );
            if (question) {
              Object.assign(question, data);
            }
          }
        });
      },

      setEdit: (value) => {
        set((state) => {
          state.isEdit = value;
        });
      },
    })),
    {
      name: "create-assessment-storage", // localStorage key
    
    }
  )
);
