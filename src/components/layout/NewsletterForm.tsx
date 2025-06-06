import React, { useState, useEffect } from "react";

interface NewsletterFormProps {
  onSubscribe?: (email: string) => void;
}

function NewsletterForm({ onSubscribe }: NewsletterFormProps) {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    const savedSubscriptionStatus = localStorage.getItem(
      "newsletter_subscribed"
    );
    if (savedSubscriptionStatus === "true") {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      if (onSubscribe) {
        onSubscribe(email);
      }
      localStorage.setItem("newsletter_subscribed", "true");

      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div>
      <h4 className="font-semibold mb-4">Stay Connected</h4>
      {isSubscribed ? (
        <div className="bg-primary-100 text-primary-800 p-3 rounded-lg">
          <p>Thanks for subscribing! We'll keep you updated.</p>
          <button
            onClick={() => {
              localStorage.removeItem("newsletter_subscribed");
              setIsSubscribed(false);
            }}
            className="text-primary-600 text-sm underline mt-2 hover:text-primary-800"
          >
            Reset subscription
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-300 mb-4">
            Sign up for updates on new pets and adoption events.
          </p>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-lg transition-colors"
            >
              Sign Up
            </button>
          </form>
        </>
      )}
      <p className="text-xs text-gray-400 mt-2">
        We respect your privacy and will never share your information.
      </p>
    </div>
  );
}

export default NewsletterForm;
