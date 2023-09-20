"use client";

import * as z from "zod";
import axios from "axios";
import { Code, FileQuestionIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";

import { formSchema } from "./constants";

const QuestionPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/question', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
      } else {
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <div className="flex flex-row">

        <div className="w-1/3">
          <div className="bg-white rounded-lg pb-4">
            <div className="pt-4">
              <Heading
                title="Tests List"
                description="Paste your content to generate AI powered questions."
                icon={FileQuestionIcon}
                iconColor="text-boost-500"
                bgColor="bg-boost-500/10"
              />
            </div>

            <div className="px-4 pb-8 text-sm space-y-3">
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-14 bg-boost-500 flex items-center justify-center rounded-full">
                  <p className="px-4 text-white">007</p>
                </div>
                <div className="w-full bg-boost-500 flex items-center rounded-full">
                  <p className="px-4 text-white">Test description ...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-14 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">006</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Test description ...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-14 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">005</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Test description ...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-14 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">004</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Test description ...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-14 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">003</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Test description ...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-14 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">002</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Test description ...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-14 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">001</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Test description ...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pl-4 lg:pl-8 ">
          <div className="w-full bg-white rounded-lg pb-4">
            <div className="pt-4">
              <Heading
                title="Questions"
                description="Paste your content to generate AI powered questions."
                icon={FileQuestionIcon}
                iconColor="text-boost-500"
                bgColor="bg-boost-500/10"
              />
            </div>

            <div className="text-sm px-4 lg:px-4 space-y-2">
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-boost-500 flex items-center justify-center rounded-full">
                  <p className="px-4 text-white">1</p>
                </div>
                <div className="w-full bg-boost-500 flex items-center rounded-full">
                  <p className="px-4 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-boost-500 flex items-center justify-center rounded-full">
                  <p className="px-4 text-white">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">2</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">3</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">4</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">5</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">6</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">7</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">8</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">9</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">10</p>
                </div>
                <div className="w-full bg-muted flex items-center rounded-full">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
                <div className="w-16 bg-muted flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg pb-4 mt-8">
            <div className="pt-4">
              <Heading
                title="Bonus & Reward Assignment"
                description="Paste your content to generate AI powered questions."
                icon={FileQuestionIcon}
                iconColor="text-boost-500"
                bgColor="bg-boost-500/10"
              />
            </div>

            <div className="text-sm px-4 lg:px-4 space-y-3 mb-4">
              <div className="h-20 flex flex-row justify-center space-x-4">
                <div className="w-16 bg-boost-500 flex items-center justify-center rounded-lg">
                  <p className="px-4 text-white">1</p>
                </div>
                <div className="w-full bg-boost-500/10 flex items-center rounded-lg">
                  <p className="px-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </div>
              </div>
              <div className="h-6 flex flex-row justify-center space-x-4">
                <div className="w-14 flex items-center justify-center rounded-full">
                  <p className="px-4 text-muted-foreground">Points</p>
                </div>
                <div className="w-full bg-boost-500 flex items-center rounded-full">
                  <p className="px-4 text-white">50</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="bg-boost-500 px-4 text-white rounded-full font-bold">-</p>
                  <p className="bg-boost-500 px-6 text-white rounded-full ">0</p>
                  <p className="bg-boost-500 px-4 text-white rounded-full font-bold">+</p>

                </div>
              </div>


            </div>



            <div className="px-4 lg:px-8 flex justify-end">
              <Button className="col-span-12 lg:col-span-2 w-32" type="submit" disabled={isLoading} size="icon">
                Save & Add
              </Button>
              <Button className="ml-4 col-span-12 lg:col-span-2 w-32" type="submit" disabled={isLoading} size="icon">
                Save & Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
