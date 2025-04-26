export type FieldType = {
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
  optionsForSelect?: string[];
  optionsForRadio?: string[];
  acceptedFileTypes: string[];
  optionsForCheckBox?: string[];
  parentSection?: null | SectionType;
  checkboxLabel?: string;
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
