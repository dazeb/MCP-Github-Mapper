//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const setGithubTokenEval: EvalFunction = {
    name: 'set-github-token Tool Evaluation',
    description: 'Evaluates if the tool can successfully set the GitHub Personal Access Token',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please set my GitHub personal access token to ghp_abc123");
        return JSON.parse(result);
    }
};

const mapGithubRepoEval: EvalFunction = {
    name: "map-github-repo Evaluation",
    description: "Evaluates the correctness of mapping a GitHub repository structure and providing summary information",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Map the structure of the GitHub repository at https://github.com/microsoft/vscode and provide summary information.");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [setGithubTokenEval, mapGithubRepoEval]
};
  
export default config;
  
export const evals = [setGithubTokenEval, mapGithubRepoEval];