"use client";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";
import SkeletonCard from "./SkeletonCard";
import Footer from "./Footer";

// Add helper to read from localStorage on init
const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || "";
  }
  return "";
};

const MoodInput = () => {
  const [mood, setMood] = useState("");
  const [outfit, setOutfit] = useState(getFromLocalStorage("outfit"));
  const [image, setImage] = useState(getFromLocalStorage("imageUrl"));
  const [loadingStep, setLoadingStep] = useState("");
  const [isPending, startTransition] = useTransition();

  // Whenever the values updates, store them
  useEffect(() => {
    if (outfit) localStorage.setItem("outfit", outfit);
    if (image) localStorage.setItem("imageUrl", image);
  }, [outfit, image]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!mood.trim()) {
      toast.error("Please enter your current mood");
      return;
    }

    try {
      startTransition(async () => {
        setLoadingStep("👗 AI Generating Outfit...");

        const res = await fetch("/api/recommend", {
          method: "POST",
          body: JSON.stringify({ mood }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.error || "Failed to fetch outfit");
        }

        setLoadingStep("🧠 Thinking about your mood...");
        await new Promise((r) => setTimeout(r, 1000));

        const data = await res.json();
        console.log(data);

        setLoadingStep("💄 Styling your look...");
        await new Promise((r) => setTimeout(r, 1000));

        setOutfit(data.outfit);
        setImage(data.imageUrl);

        setLoadingStep("⭐ Perfecting your look...");
        await new Promise((r) => setTimeout(r, 1000));

        setLoadingStep(""); // clear the step after done
      });
    } catch (error) {
      console.log("Failed to get outfit on user mood.", error);
      setLoadingStep("");
      toast.error("Something went wrong: Network Error");
    }
  };

  return (
    <div className="flex flex-col text-center items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 w-full">
      <div>
        <h2 className="text-2xl font-bold">👗 AI Mood Stylist </h2>
        <br />
        <p className="text-green-500">
          &quot;Tell me how you feel, and I’ll dress you&quot;
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row w-full max-w-4xl items-center justify-center gap-3 mt-10"
      >
        <Textarea
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How are you feeling today?"
          className="w-full"
        />
        <Button
          type="submit"
          className="bg-green-300 hover:bg-green-400 text-white cursor-pointer transition w-full sm:w-auto"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
              {loadingStep || "⏳ Generating..."}
            </span>
          ) : (
            <p>
              <span className="text-blue-400 hover:text-blue-500 transition">
                Get{" "}
              </span>
              Outfit
            </p>
          )}
        </Button>
        <Button
          type="button"
          className="cursor-pointer bg-red-300 hover:bg-red-400 transition w-full sm:w-auto"
          onClick={() => {
            setMood("");
            setOutfit("");
            setImage("");
            localStorage.removeItem("outfit");
            localStorage.removeItem("imageUrl");
          }}
        >
          Clear
        </Button>
      </form>

      {isPending ? (
        <SkeletonCard />
      ) : outfit ? (
        <Card className="flex items-center justify-center max-w-3xl mt-4 bg-gray-200 prose w-full px-1 sm:px-4">
          <CardContent>
            <p className="">{outfit}</p>
            {image && (
              <img src={image} alt="AI outfit" className="w-full rounded-lg" />
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default MoodInput;
