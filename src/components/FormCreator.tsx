import InputForm from "./InputForm";

export default function FormCreator() {
  return (
    <section className="max-w-[600px] px-3 py-4 border-gray-200 border-2 rounded-2xl w-full">
      <h2 className="text-3xl mb-3 font-bold ">Form Creator</h2>
      <div className="space-y-5">
        {/* <SectionSelectorForm /> */}
        <InputForm />
      </div>
    </section>
  );
}
