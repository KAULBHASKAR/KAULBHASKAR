import { useState } from "react";
import type { FC } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Who is KAUL BHASKAR ?",
    answer: " Metaphysical Advisor to Elite Leaders."
  },
  {
    question: "What are the primary services offered ?",
    answer: " We provides high-performers with data-driven spiritual systems to safely navigate modern power structures."
  },
  {
    question: "How can I get in touch for services ?",
    answer: "You can reach out via the following channels: \n• Phone: +91-9934418459 \n• Contact Form: Available on the website's Contact page."
  }
];

const FAQ: FC = () => {
  // Explicitly typing state to handle numbers or null
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: "100%", minHeight: "100vh", backgroundColor: "black", textAlign: "center" }}>
      <h2 className="special-font uppercase font-zentry text-blue-50 text-2xl sm:right-10 sm:text-3xl md:text-5xl lg:text-7xl pt-10">
        frequently asked questions !
      </h2>
      <p className="my-10 text-lg text-blue-50">
        Who is KAUL BHASKAR ? <br />
        What services we provide ? <br />
        Are our services chargable ? <br />
        How can I get in touch for services ? <br />
        - Answer to the such questions are here.
      </p>
      
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => toggleFAQ(index)}
            style={{
              width: "100%",
              textAlign: "center",
              padding: "0.75rem",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              background: "#FBF5DF",
              border: "none",
              borderRadius: "4px"
            }}
          >
            {faq.question}
          </button>
          {openIndex === index && (
            <div style={{ padding: "0.75rem", background: "#fafafa", borderRadius: "4px", textAlign: "center" }}>
              {faq.answer.split("\n").map((line, i) => (
                <p key={i} style={{ margin: "0.25rem 0" }}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
