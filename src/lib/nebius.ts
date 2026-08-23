import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const NEBIUS_BASE_URL = "https://api.tokenfactory.us-central1.nebius.com/v1";
const PROJECT_CHAT_MODEL = "deepseek-ai/DeepSeek-V4-Flash-0731";

/** Creates the portfolio chat model when the server has a Nebius credential. */
export function getProjectChatModel() {
  const apiKey = process.env.NEBIUS_API_KEY;

  if (!apiKey) return null;

  const nebius = createOpenAICompatible({
    name: "nebius",
    baseURL: NEBIUS_BASE_URL,
    apiKey,
  });

  return nebius.chatModel(PROJECT_CHAT_MODEL);
}
