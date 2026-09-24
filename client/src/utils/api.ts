const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type KnowledgeDoc = {
  _id: string;
  title: string;
  fileName: string;
  userId: string;
  createdAt: string;
};

export type Chat = {
  _id: string;
  title: string;
  userId: string;
  createdAt: string;
};

export type Message = {
  _id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: { message: string } | null;
};

export const getDocuments = async (): Promise<ApiResponse<KnowledgeDoc[]>> => {
  await delay(700);
  return {
    success: true,
    data: [
      {
        _id: "1",
        title: "Code Review Guidelines",
        fileName: "code-review-guidelines.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        title: "API Reference",
        fileName: "api-reference.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "3",
        title: "Onboarding Guide",
        fileName: "onboarding-guide.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "4",
        title: "Code of Conduct",
        fileName: "code_of_conduct.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
    ],
    error: null,
  };
};

export const getChats = async (): Promise<ApiResponse<Chat[]>> => {
  await delay(700);
  return {
    success: true,
    data: [
      {
        _id: "c1",
        title: "What is posthog",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "c2",
        title: "Who are our users",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "c3",
        title: "Marketing Hypothesis",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
    ],
    error: null,
  };
};

export const getChat = async (
  id: string,
): Promise<ApiResponse<{ chat: Chat; messages: Message[] }>> => {
  await delay(700);

  const messagesByChatId: Record<string, Message[]> = {
    c1: [
      {
        _id: "m1",
        chatId: id,
        role: "user",
        content: "What is posthog, and how can I use it?",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m2",
        chatId: id,
        role: "assistant",
        content:
          "**PostHog** is an **open-source product analytics platform** that helps teams understand **how users actually use their product**, not just how many users they have.\n\nUnlike tools that focus mainly on pageviews or dashboards, PostHog is built around events, behavior, and experimentation — with strong control over data ownership (cloud or self-hosted).\n\n---\n\n## What PostHog is (in simple terms)\n\nPostHog lets you answer questions like:\n\n- *What do users do after signing up?*\n- *Where do they drop off?*\n- *Which feature actually brings value?*\n- *Did this design change improve behavior or not?*\n\nIt combines:\n\n- Product analytics (events, funnels, retention)\n- Session recordings\n- Feature flags\n- A/B testing\n- Data warehouse sync\n\nAll in one platform.\n\n---\n\n## How you use PostHog (high level)\n\n1. **Track events** in your app\n\n   (e.g. `Signed up`, `Clicked \"Generate\"`, `Uploaded PDF`)\n\n2. **Attach properties**\n\n   (plan type, device, country, company size, etc.)\n\n3. **Analyze behavior** using:\n\n   - Funnels\n   - Trends\n   - Retention\n   - User paths\n\n4. **Experiment & iterate**\n\n   Turn features on/off, run A/B tests, watch recordings",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m3",
        chatId: id,
        role: "user",
        content: "Does it work with React?",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m4",
        chatId: id,
        role: "assistant",
        content:
          "Yes. Install the `posthog-js` package and initialise it in your app entry point. You can then call `posthog.capture()` anywhere in your components to track events.",
        createdAt: new Date().toISOString(),
      },
    ],
    c2: [
      {
        _id: "m5",
        chatId: id,
        role: "user",
        content: "Who are our users?",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m6",
        chatId: id,
        role: "assistant",
        content:
          "Based on the knowledge base, our users fall into three main segments:\n\n1. **Junior developers** — recently onboarded, looking for guidance on workflows and best practices\n2. **Mid-level engineers** — actively shipping features, need quick access to internal docs and code standards\n3. **Team leads** — responsible for code reviews and team health, interested in aggregate insights\n\nThe majority of active sessions come from mid-level engineers on the web client.",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m7",
        chatId: id,
        role: "user",
        content: "What do they struggle with most?",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m8",
        chatId: id,
        role: "assistant",
        content:
          "The top pain points surfaced in feedback are:\n\n- **Finding the right document** — search relevance is the most-cited friction point\n- **Onboarding speed** — new hires want faster access to context without reading everything\n- **Keeping knowledge current** — users distrust docs they suspect are out of date\n\nAddressing search quality would have the highest impact on satisfaction.",
        createdAt: new Date().toISOString(),
      },
    ],
    c3: [
      {
        _id: "m9",
        chatId: id,
        role: "user",
        content: "I have a marketing hypothesis I'd like to test. Users who read the onboarding guide convert to paid plans at a higher rate. How should I test this?",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m10",
        chatId: id,
        role: "assistant",
        content:
          "Good hypothesis. Here's a straightforward way to test it:\n\n**Define your metrics**\n- **Primary:** paid conversion rate within 14 days of signup\n- **Secondary:** time-to-first-action in the product\n\n**Set up the experiment**\n1. Segment users by whether they opened the onboarding guide (track with a `guide_opened` event)\n2. Compare conversion rates between the two groups over a 30-day window\n3. Use a chi-squared test to check for statistical significance\n\n**Watch out for**\n- Selection bias — users who read docs may already be more motivated\n- Consider an A/B test that *prompts* half of new users to read the guide to get cleaner causation",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m11",
        chatId: id,
        role: "user",
        content: "What sample size do I need?",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m12",
        chatId: id,
        role: "assistant",
        content:
          "For a reliable result, aim for:\n\n- **Baseline conversion rate:** ~10% (adjust if you know your actual rate)\n- **Minimum detectable effect:** 3 percentage points (i.e. 10% → 13%)\n- **Statistical power:** 80%\n- **Significance level:** 0.05\n\nThis gives you roughly **1,700 users per group**, or ~3,400 total.\n\nIf your current signup volume is low, consider widening the detectable effect or running the test longer rather than cutting it short.",
        createdAt: new Date().toISOString(),
      },
    ],
  };

  const stubMessages: Message[] = messagesByChatId[id] ?? [];

  return {
    success: true,
    data: {
      chat: {
        _id: id,
        title: "Sample Chat",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      messages: stubMessages,
    },
    error: null,
  };
};

export const createChat = async (title: string): Promise<ApiResponse<Chat>> => {
  await delay(400);
  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      title,
      userId: "u1",
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};

export const sendMessage = async (
  chatId: string,
  question: string,
): Promise<ApiResponse<Message>> => {
  await delay(1500);
  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      chatId,
      role: "assistant",
      content: `This is a simulated response to: "${question}"`,
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};
