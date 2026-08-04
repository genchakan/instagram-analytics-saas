export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is this a free trial? Do I need a credit card?",
    answer:
      "Yes — every plan starts with a 1 week free trial, and no credit card is needed to begin. You can explore the full dashboard before deciding on a plan.",
  },
  {
    question: "What does 'visitor insight' actually mean?",
    answer:
      "We surface activity signals connected to your profile — recent visits, engagement patterns and interest indicators — organized in one dashboard. This prototype currently runs on a development-only connection simulator; see the Development Mode notice on the connection screen.",
  },
  {
    question: "Do you store my Instagram password?",
    answer:
      "No. In this prototype, credentials are never stored, logged, or sent to Instagram or any third party. The connection is simulated locally and the submitted value is discarded immediately after the simulated request completes.",
  },
  {
    question: "Can I disconnect my profile at any time?",
    answer:
      "Yes. You can disconnect or reconnect a profile at any time from Dashboard → Connected Accounts.",
  },
  {
    question: "Is this affiliated with Instagram or Meta?",
    answer:
      "No. This application is an independent product and is not affiliated with, endorsed by, or connected to Instagram or Meta.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes — there are no hidden fees and you can cancel your plan at any time.",
  },
];
