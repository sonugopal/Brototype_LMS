"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BookIcon, LightbulbIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddQuiz from "./addQuiz";

interface ChapterQuizFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChapterQuizForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterQuizFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Add Quiz
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <LightbulbIcon className="h-4 w-4 mr-2" />
              Add Quiz
            </>
          )}
        </Button>
      </div>
      {isEditing && (
         <AddQuiz chapterId={chapterId}/>
      )}
    </div>
  )
}