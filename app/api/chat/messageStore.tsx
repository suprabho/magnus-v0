import OpenAI from "openai";
export type DBMessage = OpenAI.Chat.ChatCompletionMessageParam & { id?: string };

const messagesStore: Record<string, DBMessage[]> = {};

export function getMessageStore(threadId: string) {
  if (!messagesStore[threadId]) {
    messagesStore[threadId] = [];
  }
  const store = messagesStore[threadId];
  return {
    addMessage: (msg: DBMessage) => { store.push(msg); },
    getOpenAICompatibleMessageList: () =>
      store.map(({ id, ...m }) => m as OpenAI.Chat.ChatCompletionMessageParam),
  };
}