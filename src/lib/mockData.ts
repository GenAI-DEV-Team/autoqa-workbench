export interface Bot {
  id: string;
  name: string;
  lastQA: string | null;
  passRate: number | null;
  convCount: number;
  channel: string;
  team: string;
  status: "active" | "inactive" | "testing";
  tags: string[];
}

export interface Conversation {
  id: string;
  botId: string;
  botName: string;
  date: string;
  score: number | null;
  qaAnswer: string;
  csReview: "approved" | "need_fix" | "to_review" | null;
  policyPass: boolean;
  labels: string[];
}

export const mockBots: Bot[] = [
  {
    id: "bot_123",
    name: "Customer Support Bot",
    lastQA: "2025-09-29",
    passRate: 78,
    convCount: 2341,
    channel: "web",
    team: "Support",
    status: "active",
    tags: ["support", "tier-1"]
  },
  {
    id: "bot_456",
    name: "Sales Assistant",
    lastQA: "2025-09-27",
    passRate: 85,
    convCount: 5120,
    channel: "web",
    team: "Sales",
    status: "active",
    tags: ["sales", "lead-gen"]
  },
  {
    id: "bot_789",
    name: "Onboarding Bot",
    lastQA: null,
    passRate: null,
    convCount: 0,
    channel: "mobile",
    team: "Product",
    status: "testing",
    tags: ["onboarding", "new"]
  },
  {
    id: "bot_234",
    name: "FAQ Bot",
    lastQA: "2025-09-28",
    passRate: 92,
    convCount: 8456,
    channel: "web",
    team: "Support",
    status: "active",
    tags: ["faq", "tier-1"]
  },
  {
    id: "bot_567",
    name: "Booking Assistant",
    lastQA: "2025-09-26",
    passRate: 71,
    convCount: 1892,
    channel: "mobile",
    team: "Operations",
    status: "active",
    tags: ["booking", "calendar"]
  },
  {
    id: "bot_890",
    name: "Tech Support AI",
    lastQA: "2025-09-29",
    passRate: 88,
    convCount: 3421,
    channel: "web",
    team: "Support",
    status: "active",
    tags: ["support", "tier-2", "technical"]
  }
];

export const mockConversations: Conversation[] = [
  {
    id: "9f7a2b3c",
    botId: "bot_123",
    botName: "Customer Support Bot",
    date: "2025-09-29 14:23",
    score: 62,
    qaAnswer: "Missing authentication before providing sensitive info",
    csReview: "need_fix",
    policyPass: false,
    labels: ["auth", "policy"]
  },
  {
    id: "7b21c5d4",
    botId: "bot_123",
    botName: "Customer Support Bot",
    date: "2025-09-28 16:45",
    score: 91,
    qaAnswer: "Complete flow, all slots filled correctly",
    csReview: "approved",
    policyPass: true,
    labels: ["flow", "ux"]
  },
  {
    id: "3c05e7f8",
    botId: "bot_456",
    botName: "Sales Assistant",
    date: "2025-09-28 11:30",
    score: 71,
    qaAnswer: "Handoff to human delayed by 2 minutes",
    csReview: "to_review",
    policyPass: true,
    labels: ["handoff", "timing"]
  },
  {
    id: "6d42a1b9",
    botId: "bot_234",
    botName: "FAQ Bot",
    date: "2025-09-29 09:15",
    score: 95,
    qaAnswer: "Perfect response, accurate KB retrieval",
    csReview: "approved",
    policyPass: true,
    labels: ["kb", "accuracy"]
  },
  {
    id: "8e93f4c2",
    botId: "bot_456",
    botName: "Sales Assistant",
    date: "2025-09-27 15:20",
    score: 58,
    qaAnswer: "Failed to capture lead email, flow incomplete",
    csReview: "need_fix",
    policyPass: false,
    labels: ["nlu", "slots"]
  },
  {
    id: "1a54d8e6",
    botId: "bot_567",
    botName: "Booking Assistant",
    date: "2025-09-26 10:05",
    score: 73,
    qaAnswer: "Date parsing issue but recovered gracefully",
    csReview: "to_review",
    policyPass: true,
    labels: ["nlu", "recovery"]
  },
  {
    id: "4f72b3c9",
    botId: "bot_890",
    botName: "Tech Support AI",
    date: "2025-09-29 13:40",
    score: 89,
    qaAnswer: "Strong technical guidance, proper escalation",
    csReview: "approved",
    policyPass: true,
    labels: ["technical", "escalation"]
  },
  {
    id: "2c81e5a4",
    botId: "bot_123",
    botName: "Customer Support Bot",
    date: "2025-09-27 08:55",
    score: 45,
    qaAnswer: "PII not masked in transcript, critical issue",
    csReview: "need_fix",
    policyPass: false,
    labels: ["pii", "policy", "security"]
  }
];
