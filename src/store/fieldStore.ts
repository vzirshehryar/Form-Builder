import { FieldType } from "@/lib/types";
import { create } from "zustand";

type FieldStoreType = {
  fields: FieldType[];
  addField: (section: FieldType) => void;
  //   removeSection: (id: string) => void;
  //   updateSection: (id: string, section: Partial<SectionType>) => void;
  //   getSectionById: (id: string) => SectionType | undefined;
  //   getChildSections: (parentId: string) => SectionType[];
};

export const useFieldStore = create<FieldStoreType>((set, get) => ({
  fields: [],
  addField: (field) =>
    set((state) => ({
      fields: [...state.fields, { ...field }]
    }))

  //   removeSection: (id) =>
  //     set((state) => ({
  //       sections: state.sections.filter((section) => section.id !== id)
  //     })),

  //   updateSection: (id, section) =>
  //     set((state) => ({
  //       sections: state.sections.map((s) =>
  //         s.id === id ? { ...s, ...section } : s
  //       )
  //     })),

  //   getSectionById: (id) => {
  //     return get().sections.find((section) => section.id === id);
  //   },

  //   getChildSections: (parentId) => {
  //     return get().sections.filter((section) => section.parentId === parentId);
  //   }
}));
