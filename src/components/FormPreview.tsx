import { useFieldStore } from "@/store/fieldStore";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import InputField from "./InputField";

export default function FormPreview() {
  const fields = useFieldStore((states) => states.fields);
  const [form, setForm] = useState<any>(null);

  function onFormChange(key: string, value: string) {
    setForm(() => ({ ...form, [key]: value }));
  }

  function onSubmittingForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(form);
  }

  console.log(fields);
  return (
    <section className="max-w-[600px] px-3 py-4 border-gray-200 border-2 rounded-2xl w-full">
      <h2 className="text-3xl mb-3 font-bold ">Form Preview</h2>
      <form onSubmit={onSubmittingForm}>
        {fields.map((field, ind) => {
          return (
            <InputField
              key={ind}
              field={field}
              form={form}
              onFormChange={onFormChange}
            />
          );
        })}
        {fields.length > 0 && (
          <div className="w-full mx-auto mt-3">
            <Button type="submit" className="mx-auto">
              Submit Form
            </Button>
          </div>
        )}
      </form>
      {/* {sections.map((section) => {
        return <MySection key={section.id} section={section} />;
      })} */}
    </section>
  );
}

// function MySection({ section }: { section: SectionType }) {
//   if (section.parentSection === null) {
//     return (
//       <section>
//         <h5>{section.name}</h5>
//         <div className="pl-4">fields</div>
//       </section>
//     );
//   }
//   return (
//     <section>
//       <h5>{section.name}</h5>
//       <div className="pl-4">{sections.map((section) => {
//         return <MySection key={section.id} section={section} />;
//       })}</div>
//     </section>
//   );
// }
