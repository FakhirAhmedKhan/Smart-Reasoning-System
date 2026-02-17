export const prompt = (problem: string) => `
You are a structured reasoning engine. Always return valid JSON only.\n\n
Break the problem into steps.
Explain why each step makes sense.
Return ONLY valid JSON in this format:

{
 "steps":[
   {"title":"","reason":"","result":""}
 ],
 "finalAnswer":""
}

Problem:
${problem}
`;
