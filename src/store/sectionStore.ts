import { SectionType } from "@/lib/types";
import { create } from "zustand";

interface SectionState {
  sections: SectionType[];
  addSection: (section: Omit<SectionType, "id">) => void;
  //   removeSection: (id: string) => void;
  //   updateSection: (id: string, section: Partial<SectionType>) => void;
  //   getSectionById: (id: string) => SectionType | undefined;
  //   getChildSections: (parentId: string) => SectionType[];
}

export const useSectionStore = create<SectionState>((set, get) => ({
  sections: [],
  addSection: (section) =>
    set((state) => ({
      sections: [...state.sections, { ...section, id: crypto.randomUUID() }]
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
