export type SectionChipButtonProps = {
  id: string;
  order: number;
  name: string;
  handleChnageSection: (id:string) => void;
  handleDoubleTap: (id:string) => void;
  handleAddSection: () => void;
};
