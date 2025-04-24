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
import { FormEvent, useState } from "react";
import ErrorText from "./ErrorText";
import { useFieldStore } from "@/store/fieldStore";
import { Cross, X } from "lucide-react";

const INPUT_AVAILABLE_OPTIONS = [
  "Text Field",
  "Dropdown",
  "Radio Button",
  "File Upload",
  "Check Box",
  "Country",
  "Date picker"
];

const InputForm = () => {
  const addField = useFieldStore((state) => state.addField);
  const [fieldType, setFieldType] = useState(INPUT_AVAILABLE_OPTIONS[0]);
  const [fieldName, setFieldName] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const [radioOption, setRadioOption] = useState("");
  const [radioOptionError, setRadioOptionError] = useState("");
  const [radioOptions, setRadioOptions] = useState<string[]>([]);

  const [selectOption, setSelectOption] = useState("");
  const [selectOptionError, setSelectOptionError] = useState("");
  const [selectOptions, setSelectOptions] = useState<string[]>([]);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldName === "") {
      setFieldError("it is reuired");
      return;
    }

    if (fieldType === "Radio Button") {
      if (radioOptions.length === 0) {
        setRadioOptionError("At least one option is required");
        return;
      }
    }
    if (fieldType === "Dropdown") {
      if (selectOptions.length === 0) {
        setSelectOptionError("At least one option is required");
        return;
      }
    }

    console.log(fieldType, fieldName, isRequired, selectOptions);
    addField({
      name: fieldName,
      type: fieldType,
      required: isRequired,
      placeholder,
      optionsForRadio: radioOptions,
      optionsForSelect: selectOptions
    });

    setFieldName("");
    setIsRequired(false);
    setPlaceholder("");
    setFieldType(INPUT_AVAILABLE_OPTIONS[0]);
  };

  function addOption(optionType: "select" | "radio") {
    if (optionType === "radio" && radioOption === "") {
      setRadioOptionError("Option is required");
      return;
    }
    if (optionType === "select" && selectOption === "") {
      setSelectOptionError("Option is required");
      return;
    }

    if (optionType === "radio") {
      if (radioOptions.some((val) => val === radioOption)) {
        setRadioOptionError("Option already exists");
        return;
      }
      setRadioOptions(() => [...radioOptions, radioOption]);
      return;
    }

    if (optionType === "select") {
      if (selectOptions.some((val) => val === selectOption)) {
        setSelectOptionError("Option already exists");
        return;
      }
      setSelectOptions(() => [...selectOptions, selectOption]);
      return;
    }
  }

  function removeOption(optionType: "select" | "radio", opt: string) {
    if (optionType === "radio") {
      const filtered = radioOptions.filter((val) => val !== opt);
      setRadioOptions(filtered);
    }
    if (optionType === "select") {
      const filtered = selectOptions.filter((val) => val !== opt);
      setSelectOptions(filtered);
    }
  }

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-2">
      {/* input field name */}
      <div>
        <p className="mb-1 font-medium">
          <label htmlFor="creator_field" className="cursor-pointer">
            Label for Input
          </label>
        </p>
        <Input
          id="creator_field"
          type="text"
          placeholder="Field"
          className="w-full"
          value={fieldName}
          onChange={(e) => {
            setFieldError("");
            setFieldName(e.target.value);
          }}
        />
        {fieldError && <ErrorText text={fieldError} />}
      </div>

      {/* input field type */}
      <div>
        <p className="mb-1 font-medium">
          <label htmlFor="creator_input_type" className="cursor-pointer">
            Type of Input
          </label>
        </p>
        <Select
          name="creator_input_type"
          value={fieldType}
          onValueChange={(val) => setFieldType(val)}
        >
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Select an Input field" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {INPUT_AVAILABLE_OPTIONS.map((val, ind) => (
                <SelectItem
                  value={val}
                  key={ind}
                  className="hover:bg-gray-300 cursor-pointer"
                >
                  {val}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Input Fields for Text Field */}
      {fieldType === "Text Field" && (
        <div>
          <p className="mb-1 font-medium">
            <label htmlFor="creator_placeholder" className="cursor-pointer">
              Placeholder for Input
            </label>
          </p>
          <Input
            id="creator_placeholder"
            type="text"
            placeholder="Placeholder"
            className="w-full"
            value={placeholder}
            onChange={(e) => {
              setPlaceholder(e.target.value);
            }}
          />
        </div>
      )}

      {/* Input Fields for Radio Input */}
      {fieldType === "Radio Button" && (
        <div>
          <p className="mb-1 font-medium">
            <label htmlFor="creator_radio_options" className="cursor-pointer">
              Options
            </label>
          </p>
          <div className="flex gap-2">
            <Input
              id="creator_radio_options"
              type="text"
              className="w-full"
              placeholder="Enter options"
              value={radioOption}
              onChange={(e) => {
                setRadioOptionError("");
                setRadioOption(e.target.value);
              }}
            />
            <Button
              className="w-fit cursor-pointer"
              onClick={() => addOption("radio")}
              type={"button"}
            >
              Add +
            </Button>
          </div>
          <ErrorText text={radioOptionError} />
          <div className="flex flex-col gap-1 mt-1">
            {radioOptions.map((opt, ind) => (
              <div
                key={ind}
                className="flex w-full px-4 py-1 bg-gray-200 rounded-sm"
              >
                <p className="w-full">{opt}</p>
                <X
                  onClick={() => removeOption("radio", opt)}
                  className=" cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Fields for Dropdown input */}
      {fieldType === "Dropdown" && (
        <div>
          <p className="mb-1 font-medium">
            <label htmlFor="creator_radio_options" className="cursor-pointer">
              Options
            </label>
          </p>
          <div className="flex gap-2">
            <Input
              id="creator_radio_options"
              type="text"
              className="w-full"
              placeholder="Enter options"
              value={selectOption}
              onChange={(e) => {
                setSelectOptionError("");
                setSelectOption(e.target.value);
              }}
            />
            <Button
              className="w-fit cursor-pointer"
              onClick={() => addOption("select")}
              type={"button"}
            >
              Add +
            </Button>
          </div>
          <ErrorText text={selectOptionError} />
          <div className="flex flex-col gap-1 mt-1">
            {selectOptions.map((opt, ind) => (
              <div
                key={ind}
                className="flex w-full px-4 py-1 bg-gray-200 rounded-sm"
              >
                <p className="w-full">{opt}</p>
                <X
                  onClick={() => removeOption("select", opt)}
                  className=" cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Is field required */}
      {fieldType !== "Dropdown" && (
        <div className="flex gap-2 items-center">
          <Input
            id="creator_required"
            type="checkbox"
            placeholder="Field"
            className="w-4 h-4 cursor-pointer"
            checked={isRequired}
            onChange={() => setIsRequired(!isRequired)}
          />
          <p className="font-medium">
            <label htmlFor="creator_required" className="cursor-pointer">
              Is it require?
            </label>
          </p>
        </div>
      )}
      {/* adding section button */}
      <div className="flex justify-center">
        <Button type="submit" variant="outline" className="cursor-pointer">
          Add Field
        </Button>
      </div>
    </form>
  );
};

export default InputForm;
