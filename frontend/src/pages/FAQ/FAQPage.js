import React, { useState } from 'react';
import './FAQPage.css';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the refilling process work?",
      answer:
        "When you fill out the request refill form, our team will contact you to discuss the details, including your container type, location, and schedule. This ensures a smooth and personalized refilling process."
    },
    {
      question: "Can I schedule a regular delivery?",
      answer:
        "Yes, you can set up fixed delivery schedules to ensure you never run out of water. This can be customized based on your needs."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash on delivery for all orders. Additionally, credit card payments are simulated for demonstration purposes, ensuring a smooth user experience during checkout."
    },
    {
      question: "Do I need to purchase a new gallon for refilling?",
      answer:
        "Not at all! You can refill your existing container. If you don’t have one, you can purchase a new gallon from us."
    }
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleQuestion(index)}
            >
              {faq.question}
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
