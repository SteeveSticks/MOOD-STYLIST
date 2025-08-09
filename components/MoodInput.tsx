"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";
import SkeletonCard from "./SkeletonCard";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Image from "next/image";
import { Label } from "./ui/label";
import { Download } from "lucide-react";
import { notFound } from "next/navigation";

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
  const [gender, setGender] = useState("female");
  const [isPending, startTransition] = useTransition();

  console.log(gender);
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
          body: JSON.stringify({ mood, gender }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.error || "Failed to fetch outfit");
        }

        if (res.status === 404) {
          notFound();
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
    <div>
      {/* <h1 className="flex items-center justify-end pr-10 mb-4">
        Select your gender
      </h1> */}
      <RadioGroup
        value={gender}
        onValueChange={setGender}
        className="flex items-center justify-end gap-6 pr-4 md:pt-0 pt-10 max-md:hidden"
      >
        <div className="flex flex-col items-center gap-2">
          <RadioGroupItem value="male" id="male" className="" />
          <Label
            htmlFor="male"
            className="cursor-pointer peer-checked:ring-2 ring-blue-500 rounded-lg overflow-hidden"
          >
            <Image
              src="/img/man-avatar.jpg"
              alt="Male"
              width={100}
              height={100}
              className="rounded-lg"
            />
          </Label>
          <span className="text-sm">Male</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <RadioGroupItem value="female" id="female" className="" />
          <Label
            htmlFor="female"
            className="cursor-pointer peer-checked:ring-2 ring-blue-700 rounded-lg overflow-hidden"
          >
            <Image
              src="/img/female-avatar.jpg"
              alt="Female"
              width={100}
              height={100}
              className="rounded-lg"
            />
          </Label>
          <span className="text-sm">Female</span>
        </div>
      </RadioGroup>

      <div className="flex flex-col text-center items-center justify-center md:pt-5 pt-14 px-4 sm:px-6 lg:px-8 w-full">
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
                <div className="relative w-full mt-4 group">
                  <img
                    src={image}
                    alt="AI outfit"
                    className="w-full rounded-lg"
                  />
                  <a
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    href={image}
                    className="absolute top-2 right-2 md:opacity-0 md:group-hover:opacity-100  transition-opacity bg-white/80 hover:bg-white text-black p-2 md:p-4 text-sm rounded-full shadow"
                  >
                    <Download className="size-5" />
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default MoodInput;
