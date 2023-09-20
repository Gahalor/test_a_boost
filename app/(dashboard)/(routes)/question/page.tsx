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
      setMessages((current) => [...current, response.data]);

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
        <div className="w-full">
          <div className="w-full bg-white rounded-lg pb-4">
            <div className="pt-4">
              <Heading
                title="Content"
                description="Paste your content to generate AI powered questions."
                icon={FileQuestionIcon}
                iconColor="text-boost-500"
                bgColor="bg-boost-500/10"
              />
            </div>
            <div className="px-4 lg:px-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="
                  rounded-lg 
                  w-full
                  md:px-6 
                  focus-within:shadow-sm
                "
                >
                  <FormField
                    name="prompt"
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-10 rounded-lg p-4 bg-slate-100">
                        <FormControl className="m-0 p-0 h-28">
                          <Input
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-slate-100"
                            disabled={isLoading}
                            placeholder="Paste your content to generate AI powered questions."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="mt-4 flex justify-end">
                    <Button className="col-span-12 lg:col-span-2 w-32 bg-boost-500" type="submit" disabled={isLoading} size="icon">
                      Generate
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg pb-4 mt-4">
            <div className="pt-4">
              <Heading
                title="Question"
                description="Paste your content to generate AI powered questions."
                icon={FileQuestionIcon}
                iconColor="text-boost-500"
                bgColor="bg-boost-500/10"
              />
            </div>
            <div className="px-4 lg:px-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="
                  rounded-lg 
                  w-full
                  md:px-6 
                  focus-within:shadow-sm
                "
                >
                  <FormField
                    name="prompt"
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-10 rounded-lg p-4 bg-slate-100">
                        <FormControl className="m-0 p-0 h-12">
                          <Input
                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-slate-100"
                            disabled={isLoading}
                            placeholder="Paste your content to generate AI powered questions."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

              <div className="space-y-3 mt-5 text-sm">
                <div className="h-14 w-full flex flex-row space-x-2">
                  <div className="w-10 bg-slate-300 flex items-center justify-center rounded-lg">
                    <p className="px-4">A</p>
                  </div>
                  <div className="w-full bg-slate-300 flex items-center rounded-lg">
                    <p className="px-4">Planteamiento...</p>
                  </div>
                </div>
                <div className="h-12 w-full flex flex-row space-x-2">
                  <div className="w-10 bg-slate-300 flex items-center justify-center rounded-lg">
                    <p className="px-4">B</p>
                  </div>
                  <div className="w-full bg-slate-300 flex items-center rounded-lg">
                    <p className="px-4">Planteamiento...</p>
                  </div>
                </div>
                <div className="h-12 w-full flex flex-row space-x-2">
                  <div className="w-10 bg-slate-300 flex items-center justify-center rounded-lg">
                    <p className="px-4">C</p>
                  </div>
                  <div className="w-full bg-slate-300 flex items-center rounded-lg">
                    <p className="px-4">Planteamiento...</p>
                  </div>
                </div>
                <div className="h-12 w-full flex flex-row space-x-2">
                  <div className="w-10 bg-slate-300 flex items-center justify-center rounded-lg">
                    <p className="px-4">D</p>
                  </div>
                  <div className="w-full bg-slate-300 flex items-center rounded-lg">
                    <p className="px-4">Planteamiento...</p>
                  </div>
                </div>
              </div>


                  <div className="mt-4 flex justify-end">
                    <Button className="col-span-12 lg:col-span-2 w-32" type="submit" disabled={isLoading} size="icon">
                      Save & Add
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>


        <div className="pl-4 lg:pl-8 w-1/3">
          <div className="bg-white rounded-lg pb-4">
            <div className="pt-4">
              <Heading
                title="Test Preview"
                description="Paste your content to generate AI powered questions."
                icon={FileQuestionIcon}
                iconColor="text-boost-500"
                bgColor="bg-boost-500/10"
              />
            </div>


            <div className="px-4 pb-20 text-sm">
              <div className="h-7 mb-4 flex flex-row justify-between space-x-6">
                <div className="w-1/2 bg-slate-100 flex items-center justify-center rounded-lg">
                  <p className="px-3 text-muted-foreground">10.09.2023</p>
                </div>
                <div className="w-1/2 bg-slate-100 flex items-center justify-center rounded-lg">
                  <p className="px-3 text-muted-foreground">0000</p>
                </div>
              </div>
              <div className="h-7 mb-4">
                <div className="w-full bg-slate-100  rounded-lg">
                  <p className="h-20 p-3 text-muted-foreground">Description</p>
                </div>
              </div>
            </div>

            <div className="px-4 pb-8 text-sm space-y-3">
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-300 flex items-center justify-center rounded-full">
                  <p className="px-4">1</p>
                </div>
                <div className="w-full bg-slate-300 flex items-center rounded-full">
                  <p className="px-4">Planteamiento...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-300 flex items-center justify-center rounded-full">
                  <p className="px-4">2</p>
                </div>
                <div className="w-full bg-slate-300 flex items-center rounded-full">
                  <p className="px-4">Planteamiento...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-300 flex items-center justify-center rounded-full">
                  <p className="px-4">3</p>
                </div>
                <div className="w-full bg-slate-300 flex items-center rounded-full">
                  <p className="px-4">Planteamiento...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-300 flex items-center justify-center rounded-full">
                  <p className="px-4">4</p>
                </div>
                <div className="w-full bg-slate-300 flex items-center rounded-full">
                  <p className="px-4">Planteamiento...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-boost-500 flex items-center justify-center rounded-full">
                  <p className="px-4 text-white">5</p>
                </div>
                <div className="w-full bg-boost-500 flex items-center rounded-full">
                  <p className="px-4 text-white">Planteamiento...</p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-100 flex items-center justify-center rounded-full">
                  <p className="px-4"></p>
                </div>
                <div className="w-full bg-slate-100 flex items-center rounded-full">
                  <p className="px-4"></p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-100 flex items-center justify-center rounded-full">
                  <p className="px-4"></p>
                </div>
                <div className="w-full bg-slate-100 flex items-center rounded-full">
                  <p className="px-4"></p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-100 flex items-center justify-center rounded-full">
                  <p className="px-4"></p>
                </div>
                <div className="w-full bg-slate-100 flex items-center rounded-full">
                  <p className="px-4"></p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-100 flex items-center justify-center rounded-full">
                  <p className="px-4"></p>
                </div>
                <div className="w-full bg-slate-100 flex items-center rounded-full">
                  <p className="px-4"></p>
                </div>
              </div>
              <div className="h-7 flex flex-row justify-center space-x-4">
                <div className="w-7 bg-slate-100 flex items-center justify-center rounded-full">
                  <p className="px-4"></p>
                </div>
                <div className="w-full bg-slate-100 flex items-center rounded-full">
                  <p className="px-4"></p>
                </div>
              </div>
            </div>
            <div className="px-4 lg:px-4 flex justify-end">
              <Button className="col-span-12 lg:col-span-2 w-32" type="submit" disabled={isLoading} size="icon">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
