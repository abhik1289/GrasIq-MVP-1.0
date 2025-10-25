import { ISections } from "@/lib/store/assessment-store/assessment.types";

export const useGetQuestion = (
  sections: ISections[],
  activeSectionId: string,
  activeQuestionId: string
) => {
  const section = sections.find((item) => item.section_id === activeSectionId);
  if (!section) return undefined;
  const question = section.questions.find(
    (q) => q.questionId === activeQuestionId
  );
  return question;
};
