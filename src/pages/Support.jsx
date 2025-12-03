import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  FileText,
  Shield,
} from "lucide-react";
import { toast } from "react-toastify";

// Mock Data: FAQs
const faqs = [
  {
    question: "How do I book a session?",
    answer:
      "Simply browse the 'All Skills' page, select a skill you're interested in, and click 'Book Now'. You can choose a convenient time slot and pay securely.",
  },
  {
    question: "Can I get a refund if I cancel?",
    answer:
      "Yes! You can cancel up to 24 hours before the session starts for a full refund. Cancellations within 24 hours may be subject to a small fee.",
  },
  {
    question: "How are providers verified?",
    answer:
      "Every provider on SkillSwap undergoes a strict vetting process, including ID verification and skill assessment tests, to ensure high-quality learning.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard encryption (SSL) and trusted payment gateways like Stripe and PayPal to keep your data safe.",
  },
  {
    question: "Can I switch my mentor after booking?",
    answer:
      "Direct switching isn't supported yet. You would need to cancel your current booking (subject to refund policy) and book a new session with a different mentor.",
  },
];

export default function Support() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [ticketQuery, setTicketQuery] = useState("");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    toast.info(`Searching for: "${ticketQuery}"...`);
  };

  return (
    <section className="relative py-10  overflow-hidden min-h-screen">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 shadow-sm text-primary-600 text-sm font-semibold mb-6">
            <HelpCircle size={16} />
            <span>Support Center</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-900 mb-6 tracking-tight">
            How can we help you?
          </h2>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers (e.g., refunds, booking)..."
              value={ticketQuery}
              onChange={(e) => setTicketQuery(e.target.value)}
              className="
                block w-full pl-11 pr-4 py-4 
                bg-white border border-primary-200 rounded-full 
                text-gray-900 placeholder-gray-400 
                focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500
                shadow-lg shadow-primary-500/5 transition-all
              "
            />
          </form>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary-900 mb-2">
              Documentation
            </h3>
            <p className="text-gray-500">
              Read detailed guides on how to use the platform effectively.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary-900 mb-2">
              Live Chat
            </h3>
            <p className="text-gray-500">
              Chat with our support team in real-time (Mon-Fri).
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary-900 mb-2">
              Account Safety
            </h3>
            <p className="text-gray-500">
              Learn how we protect your data and payment information.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`
                  bg-white rounded-2xl border transition-all duration-300 overflow-hidden
                  ${
                    activeIndex === index
                      ? "border-primary-300 shadow-md"
                      : "border-primary-100 hover:border-primary-200"
                  }
                `}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span
                    className={`font-bold text-lg ${
                      activeIndex === index
                        ? "text-primary-700"
                        : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                  {activeIndex === index ? (
                    <ChevronUp className="text-primary-600 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="text-gray-400 shrink-0 ml-4" />
                  )}
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${
                      activeIndex === index
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <p className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        {/* <div className="mt-20 text-center">
          <p className="text-gray-600 mb-4">
            Still can't find what you're looking for?
          </p>
          <button className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer">
            Open a Support Ticket
          </button>
        </div> */}
      </div>
    </section>
  );
}
