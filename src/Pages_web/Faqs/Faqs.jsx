import React, { useState } from "react";
import faqsImage from "../../assets_web/FAQs-rafiki 1.png";

function Faqs() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqData = [
    {
      question: "How to create an account?",
      answer:
        "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform.",
    },
    {
      question: "Have any trust issues?",
      answer:
        "We focus on providing robust and user-friendly capabilities so you can manage your content with confidence and achieve your goals with ease.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "Use the 'Forgot Password' feature on the login page to reset your password quickly and securely.",
    },
    {
      question: "What is the payment process?",
      answer:
        "Our system supports multiple payment methods to make your experience seamless and secure.",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center">
        <img src={faqsImage} alt="FAQs Illustration" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 my-12 text-center">
        <h1 className="text-2xl font-bold">
          Below are frequently asked questions; you may find the answer for yourself
        </h1>
        <p className="mt-4 text-gray-600">
          Whether you're looking for details on managing your subscription, checking delivery status, or handling changes to your account, we’ve got you covered. If you don’t find the answer you’re looking for, our customer support team is available to assist with specific queries.
        </p>
      </div>

      <section className="py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h6 className="text-lg font-medium text-indigo-600 mb-2">FAQs</h6>
                  <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                    Looking for answers?
                  </h2>
                </div>
                <div className="space-y-8">
                  {faqData.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4"
                    >
                      <button
                        className="w-full text-left flex items-center justify-between text-xl font-medium text-gray-600 transition hover:text-indigo-600"
                        onClick={() => toggleItem(index)}
                      >
                        <span>{item.question}</span>
                        <svg
                          className={`w-5 h-5 transition-transform transform ${
                            openItem === index ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.879a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414L10 16.293l-4.707-4.586a1 1 0 011.414-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {openItem === index && (
                        <p className="mt-2 text-gray-500">{item.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faqs;
