import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { FieldType } from "@/lib/types";
import { useEffect, useId, useState } from "react";
import { Input } from "./ui/input";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

export default function InputField({
  field,
  onFormChange
}: {
  field: FieldType;
  form: any;
  onFormChange(key: string, value: string | string[]): void;
}) {
  const id = useId();
  const [date, setDate] = useState<Date>();
  const [select, setSelect] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  useEffect(() => {
    if (field.optionsForSelect && field.optionsForSelect.length > 0)
      setSelect(field.optionsForSelect[0]);
  }, [field.optionsForSelect]);

  if (field.type === "Text Field") {
    return (
      <div>
        <p className="mb-1 font-medium">
          <label htmlFor={id} className="cursor-pointer">
            {field.name}
          </label>
        </p>
        <Input
          id={id}
          name={field.name}
          type="text"
          placeholder={field.placeholder}
          className="w-full"
          onChange={(e) => onFormChange(field.name, e.target.value)}
          required={field.required}
        />
      </div>
    );
  }

  if (field.type === "Radio Button") {
    return (
      <div>
        <p className="mb-1 font-medium">
          <label htmlFor={id} className="cursor-pointer">
            {field.name}
          </label>
        </p>
        {field.optionsForRadio?.map((val, ind) => {
          return (
            <div className="flex items-center gap-2" key={ind}>
              <Input
                key={ind}
                id={ind + ""}
                type="radio"
                value={val}
                name={field.name}
                className="w-3 h-3 accent-blue-600"
                onClick={() => onFormChange(field.name, val)}
                required={field.required}
              />
              <label htmlFor={ind + ""}>{val}</label>
            </div>
          );
        })}
      </div>
    );
  }

  if (field.type === "Dropdown") {
    return (
      <div>
        <p className="mb-1 font-medium">
          <label htmlFor={id} className="cursor-pointer">
            {field.name}
          </label>
        </p>
        <Select
          value={select}
          onValueChange={(val) => {
            setSelect(val);
            onFormChange(field.name, val);
          }}
        >
          <SelectTrigger className="w-full cursor-pointer" id={id}>
            <SelectValue placeholder="Select an Input field" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {field.optionsForSelect?.map((val, ind) => (
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
    );
  }

  if (field.type === "File Upload") {
    return (
      <div>
        <p className="mb-1 font-medium">
          <label htmlFor={id} className="cursor-pointer">
            {field.name}
          </label>
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              id={id}
              type="file"
              className="w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  onFormChange(field.name, file.name);
                }
              }}
              accept={field.acceptedFileTypes?.join(",")}
              required={field.required}
            />
            <Button
              type="button"
              variant="outline"
              className="w-fit"
              onClick={() => {
                const input = document.getElementById(id) as HTMLInputElement;
                input?.click();
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
          {selectedFile && (
            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
              <p className="text-sm">{selectedFile.name}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedFile(null);
                  onFormChange(field.name, "");
                  const input = document.getElementById(id) as HTMLInputElement;
                  if (input) input.value = "";
                }}
              >
                Remove
              </Button>
            </div>
          )}
          {field.acceptedFileTypes && field.acceptedFileTypes.length > 0 && (
            <p className="text-sm text-gray-500">
              Accepted file types: {field.acceptedFileTypes.join(", ")}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (field.type === "Date picker") {
    return (
      <div className="relative">
        <p className="mb-1 font-medium">
          <label htmlFor={id} className="cursor-pointer">
            {field.name}
          </label>
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                onFormChange(field.name, date + "");
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input
          type="date"
          className="absolute left-0 -z-10 opacity-0"
          value={""}
          required={date ? false : true}
        />
        {/* {fieldError && <ErrorText text={fieldError} />} */}
      </div>
    );
  }

  if (field.type === "Check Box") {
    const onCheckBoxChanged = (name: string, val: string) => {
      if (selectedFields.includes(val)) {
        setSelectedFields((prev) => prev.filter((v) => v !== val));
        onFormChange(
          name,
          selectedFields.filter((v) => v !== val)
        );
      } else {
        setSelectedFields((prev) => [...prev, val]);
        onFormChange(name, [...selectedFields, val]);
      }
    };

    return (
      <div>
        <p className="mb-1 font-medium">
          <label htmlFor={id} className="cursor-pointer">
            {field.name}
          </label>
        </p>
        {field.optionsForCheckBox?.map((val, ind) => {
          return (
            <div className="flex items-center gap-2" key={ind}>
              <Input
                key={ind}
                id={ind + ""}
                type="checkbox"
                name={field.name}
                className="w-3 h-3 accent-blue-600"
                onClick={() => onCheckBoxChanged(field.name, val)}
              />
              <label htmlFor={ind + ""}>{val}</label>
            </div>
          );
        })}
      </div>
    );
  }
}
