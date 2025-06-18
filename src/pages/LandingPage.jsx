import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="text-4xl font-bold mb-6">Style Max</h1>
      <p className="text-lg max-w-2xl mb-8">
        An AI-powered fashion assistant that delivers personalized outfit suggestions based on your body type, style preferences, and occasion — while auto-categorizing your wardrobe, syncing with real-time weather and even tarot-inspired mood styling. Get instant links to in-stock items from online or nearby stores, and plan your perfect look effortlessly — anytime, anywhere.
      </p>
      <button
        onClick={() => navigate("/chat")}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
      >
        Try it now →
      </button>
    </div>
  );
}
