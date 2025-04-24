import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Button } from "./ui/button";
import { SectionType } from "@/lib/types";
import { useSectionStore } from "@/store/sectionStore";
import ErrorText from "./ErrorText";

const SectionSelectorForm = () => {
  const sections = useSectionStore((state) => state.sections);
  const addSection = useSectionStore((state) => state.addSection);
  const [sectionName, setSectionName] = useState("");
  const [nameError, setNameError] = useState("");
  const [parentSection, setParentSection] = useState<SectionType | null>(null);

  const onSectionSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sectionName) {
      setNameError("Section name is required");
      return;
    }
    console.log(sectionName, parentSection);
    addSection({ parentSection, name: sectionName });
    setParentSection(null);
    setSectionName("");
  };

  const handleParentSelection = (sectionId: string) => {
    if (sectionId === "-1") {
      setParentSection(null);
    }
    const neededSection = sections.filter(
      (section) => section.id === sectionId
    );
    setParentSection(neededSection[0]);
  };

  return (
    <form onSubmit={onSectionSubmit} className="flex flex-col gap-2">
      {/* section name */}
      <div>
        <p className="mb-1 font-medium">
          <label htmlFor="section" className="cursor-pointer">
            Section Name *
          </label>
        </p>
        <Input
          id="section"
          type="text"
          placeholder="Section"
          className="w-full"
          value={sectionName}
          onChange={(e) => {
            setSectionName(e.target.value);
            setNameError("");
          }}
        />
        {nameError && <ErrorText text={nameError} />}
      </div>
      {/* sub-section of */}
      <div>
        <p className="mb-1 sfont-medium">
          <label htmlFor="subsection_of" className="cursor-pointer">
            Sub-section of
          </label>
        </p>
        <Select
          name="subsection_of"
          onValueChange={handleParentSelection}
          value={parentSection?.id || "-1"}
        >
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectItem
                value={"-1"}
                key={"none"}
                className="hover:bg-gray-300 cursor-pointer"
              >
                {"None"}
              </SelectItem>
              {sections.map((section, ind) => (
                <SelectItem
                  value={section.id}
                  key={ind}
                  className="hover:bg-gray-300 cursor-pointer"
                >
                  {section.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* adding section button */}
      <div className="flex justify-center mt-3">
        <Button type="submit" variant="outline" className="cursor-pointer">
          Add Section
        </Button>
      </div>
    </form>
  );
};

export default SectionSelectorForm;
