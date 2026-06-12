import { deepseek } from "@ai-sdk/deepseek";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

type ProjectContext = {
  name?: string;
  description?: string;
  tags?: string[];
  live?: string | null;
  github?: string | null;
};

export async function POST(req: Request) {
  const { messages, project }: { messages: UIMessage[]; project?: ProjectContext } =
    await req.json();

  const system = `You are a concise, friendly assistant embedded in Dey's portfolio. You help visitors learn about the project below by answering their questions.

Project:
- Name: ${project?.name ?? "n/a"}
- Description: ${project?.description ?? "n/a"}
${project?.tags?.length ? `- Tech stack: ${project.tags.join(", ")}` : ""}
${project?.live ? `- Live URL: ${project.live}` : ""}
${project?.github ? `- Source: ${project.github}` : ""}

Keep replies short (1-3 sentences unless asked for more). Stay focused on this project and its technology. If asked something unrelated, gently steer the conversation back to the project.`;

  const result = streamText({
    model: deepseek("deepseek-v4-flash"),
    system,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
