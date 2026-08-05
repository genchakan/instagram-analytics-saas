export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Translated: call getFaqItems(t) with the current locale's `t` function
 * rather than importing a static array, since this module has no hook
 * access.
 */
export function getFaqItems(t: (key: string) => string): FaqItem[] {
  return [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
  ];
}
