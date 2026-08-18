import api from "@/lib/api";

export type AISource = {
  document_id: number;
  title: string;
  chunk_id: number;
  excerpt: string;
  score: number;
};

export type AIChatResponse = {
  conversation_id: number;
  answer: string;
  sources: AISource[];
  provider: string;
};

export const aiApi = {
  chat: async (
    message: string,
    conversation_id?: number
  ): Promise<AIChatResponse> => {
    const response = await api.post<AIChatResponse>(
      "/ai/chat",
      {
        message,
        conversation_id,
        organization_id: null,
        top_k: 5,
      },
      { timeout: 70000 }
    );
    return response.data;
  },

  knowledge: async () => {
    const response = await api.get("/ai/knowledge");
    return response.data;
  },

  addKnowledge: async (payload: {
    Title: string;
    Content: string;
    SourceType?: string;
    SourceURL?: string;
  }) => {
    const response = await api.post("/ai/knowledge", payload);
    return response.data;
  },
};
