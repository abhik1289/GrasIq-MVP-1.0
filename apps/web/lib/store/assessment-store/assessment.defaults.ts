import { v1 as uuidv1 } from "uuid";
import { IOptions, IQuestions, ISections, IExam } from "./assessment.types";

// Generate IDs
export const FIRST_SECTION_ID = uuidv1();
export const QUESTION_ID = uuidv1();

export const DEFAULT_OPTIONS: IOptions[] = [
  {
    optionId: `opt-0-${QUESTION_ID}`,
    isCorrect: false,
    questionId: QUESTION_ID,
    text: "A. Rahul Dravid",
  },
  {
    optionId: `opt-1-${QUESTION_ID}`,
    isCorrect: false,
    questionId: QUESTION_ID,
    text: "B. Sourav Ganguly",
  },
  {
    optionId: `opt-2-${QUESTION_ID}`,
    isCorrect: false,
    questionId: QUESTION_ID,
    text: "C. Virat Kohli",
  },
  {
    optionId: `opt-3-${QUESTION_ID}`,
    isCorrect: true,
    questionId: QUESTION_ID,
    text: "D. Mahendra Singh Dhoni",
  },
];

export const DEFAULT_QUESTION: IQuestions[] = [
  {
    questionId: QUESTION_ID,
    sectionId: FIRST_SECTION_ID,
    title:
      "Who was the captain of the Indian cricket team when India won the ICC Cricket World Cup in 2011?",
    type: "MCQ",
    options: DEFAULT_OPTIONS,
    // activeQuestionId: QUESTION_ID,
    // setActiveQuestionId: (id: string) => {}, // stubbed
  },
];

export const DEFAULT_SECTION: ISections = {
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
  questionSerialNo: "A",
  optionSerialNo: "a",
  // questionSerialNo: 1,
  // optionSerialNo: 1,
  questions: DEFAULT_QUESTION,
};

export const DEFAULT_EXAM: IExam = {
  assessment_id: uuidv1(),
  name: "Assessment 1",
  description: "",
  duration: 30,
  totalMarks: 0,
  type: "Test",
  published: false,
  isEdit: false,
  companyId: undefined,
  publishedAt: undefined,
  availabilityStartsAt: undefined,
  availabilityEndsAt: undefined,
  activeSectionId: FIRST_SECTION_ID,
  activeQuestionId: QUESTION_ID,
  sections: [DEFAULT_SECTION],
  setExamData: () => {},
  setAciveSectionId: () => {},
  setActiveQuestionId: () => {},
  removeSection: () => {},
  updateSection: () => {},
  addSection: () => {},
  addQuestion: () => {},
  removeQuestion: () => {},
  updateQuestion: () => {},
  setEdit: () => {},
  setExamName: () => {},
};
