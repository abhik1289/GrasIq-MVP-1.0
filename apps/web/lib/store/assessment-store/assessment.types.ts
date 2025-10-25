// assessment.types.ts

export type QTYPES =
  | "MCQ"
  | "READING"
  | "WRITTING"
  | "CODING"
  | "SPEAKING"
  | "LISTENING";

export type Q_SERIAL_TYPES = "A" | "a" | "number" | "roman_no" | "custom";
export type O_SERIAL_TYPES = "A" | "a";

export type IOptions = {
  optionId: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
};

export type IQuestions = {
  // activeQuestionId: string;
  questionId: string;
  sectionId: string;
  title: string;
  type: QTYPES;
  options?: IOptions[];
};
export type ICodeing = {
  questionTitle: string;
  description: string;
  defaultCode: string;
  constraints: string;
  allowLanguage: string[];
  testCase: {
    input: string;
    output: string;
  }[];
  example: {
    input: string;
    output: string;
    inputImage?: string;
    outputImage?: string;
  }[];
};
export type ISections = {
  isActive: false;
  section_id: string;
  name: string;
  description: string;
  duration: number;
  order: number;
  totalMarks: number;
  isStar: boolean;
  isSkipable: boolean;
  isNagativeMarks: boolean;
  noOfQuestion?: number;
  questionSerialNo: Q_SERIAL_TYPES;
  optionSerialNo: O_SERIAL_TYPES;
  questions: IQuestions[];
};

export type IExamBuilder = {
  assessment_id: string;
  name: string;
  isEdit: boolean;
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
  activeQuestionId: string;
  setAciveSectionId: (id: string) => void;
  setActiveQuestionId: (id: string) => void;
  setExamName: (id: string, title: string) => void;
};

export type ISectionControllers = {
  removeSection: (id: string) => void;
  updateSection: (id: string, data: Partial<ISections>) => void;
  addSection: () => void;
  setEdit: (value: boolean) => void;
};

export type IQuestionControllers = {
  addQuestion: (sectionId: string, data: IQuestions) => void;
  updateQuestion: (
    sectionId: string,
    questionId: string,
    data: Partial<IQuestions>
  ) => void;
  removeQuestion: (sectionId: string, questionId: string) => void;
};

export type IExam = IExamBuilder & ISectionControllers & IQuestionControllers;

// export type IQuestion = IQuestions & IQuestionControllers;
