import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// TASK

// The task is to write an application to find out which bus lines that have the most bus stops on their route, and to present the top 10 bus lines in a nice and formatted way in a web browser. The web page should show the names of every bus stop for each of the bus lines in the top 10 list. There are no requirements how the bus stops are sorted.

// I choose to not use typescript since it was a very small project and I wanted to save time. Same thing when it comes to testing.
const Spinner = () => (
  <svg
    aria-hidden="true"
    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

function App() {
  const [busLines, setBusLines] = useState(null);

  const getBusLines = async () => {
    try {
      const getBusLines = await fetch("http://localhost:3000/get-lines");

      const busLines = await getBusLines.json();

      setBusLines(busLines?.topTenLines);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBusLines();
  }, []);

  return (
    <>
      <h1 className="mb-5">Välkommen!</h1>
      <p>Här kan du se dem 10 buss linjerna med flest hållplatser</p>

      <div className="flex justify-between mt-10 mb-4 w-full">
        <span className="ml-5">Linje</span>
        <span className="mr-14">Antal stopp</span>
      </div>
      <div className="mx-auto">
        {!busLines && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
        <Accordion type="single" collapsible className="w-full no-underline">
          {busLines &&
            busLines.map((busLine) => (
              <AccordionItem
                value={busLine[0]}
                key={busLine[0]}
                className="text-left no-underline"
              >
                <AccordionTrigger className="no-underline accordion-button">
                  <div>{busLine[0]}</div>
                  <span className="ml-auto mr-6 text-sm">
                    {busLine[1].numberOfStops}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-4 pl-6">
                    {busLine[1].allStops.map((s, i) => (
                      <p className="pb-2" key={`${s.stopName}-${i}`}>
                        {s.stopName}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </>
  );
}

export default App;
