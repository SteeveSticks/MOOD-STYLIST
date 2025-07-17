"use client";
import { useState, useTransition } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const MoodInput = () => {
  const [mood, setMood] = useState("");
  const [isPending, startTransition] = useTransition();

  console.log(mood);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      startTransition(async () => {});
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="flex flex-col text-center items-center justify-center pt-20">
      <div>
        <h2 className="text-2xl font-bold">👗 AI Mood Stylist </h2>
        <br />
        <p className="text-green-500">
          &quot;Tell me how you feel, and I’ll dress you&quot;
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-3 mt-10"
      >
        <Textarea
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How are you feeling today?"
          className="w-3xl"
        />
        <Button
          type="submit"
          className="bg-green-300 hover:bg-green-400 text-white cursor-pointer"
        >
          <span className="text-blue-400 hover:text-blue-500">Get</span> Outfit
        </Button>
      </form>
    </div>
  );
};

export default MoodInput;
