export type Step = {
    title: string;
    reason: string;
    result: string;
};

export type AIResponse = {
    steps: Step[];
    finalAnswer: string;
};
