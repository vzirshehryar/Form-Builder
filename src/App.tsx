import FormCreator from "./components/FormCreator";
import FormPreview from "./components/FormPreview";
// import FormPreview from "./components/FormPreview";

function App() {
  return (
    <section>
      <header className="flex justify-center items-center bg-black text-white px-3 md:px-6 py-3 shadow-2xl">
        <div className="w-fit">
          <img src="/favicon-white.svg" alt="logo" className="w-14 h-auto" />
        </div>
        <h1 className="text-3xl w-full text-center">Dynamic Form Builder</h1>
      </header>
      <section className="flex justify-center items-center w-full flex-col gap-4 py-8">
        <FormCreator />
        <FormPreview />
      </section>
    </section>
  );
}

export default App;
