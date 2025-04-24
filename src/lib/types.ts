export type FieldType = {
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
  optionsForSelect?: string[];
  optionsForRadio?: string[];
  // sectionName: string;
  // parentSection: null | SectionType;
};

export type SectionType = {
  id: string;
  name: string;
  parentSection: null | SectionType;
};

// export type sectionType = {
//   fields: FieldType[];
//   [key: string]: SectionType;
// }
