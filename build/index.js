import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { Octokit } from "@octokit/rest";
let githubToken = null;
let octokit = null;
const server = new Server({
    name: "github-mapper-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "set-github-token",
                description: "Set the GitHub Personal Access Token for authentication",
                inputSchema: {
                    type: "object",
                    properties: {
                        token: {
                            type: "string",
                            description: "GitHub Personal Access Token",
                        },
                    },
                    required: ["token"],
                },
            },
            {
                name: "map-github-repo",
                description: "Map a GitHub repository structure and provide summary information",
                inputSchema: {
                    type: "object",
                    properties: {
                        repoUrl: {
                            type: "string",
                            description: "URL of the GitHub repository (e.g., https://github.com/username/repo)",
                        },
                    },
                    required: ["repoUrl"],
                },
            },
        ],
    };
});
// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === "set-github-token") {
        const { token } = args;
        githubToken = token;
        octokit = new Octokit({ auth: githubToken });
        return {
            content: [
                {
                    type: "text",
                    text: "GitHub Personal Access Token has been set successfully.",
                },
            ],
        };
    }
    else if (name === "map-github-repo") {
        if (!githubToken || !octokit) {
            throw new Error("GitHub token not set. Please use the set-github-token tool first.");
        }
        const { repoUrl } = args;
        try {
            const { owner, repo } = parseGitHubUrl(repoUrl);
            const repoInfo = await getRepoInfo(owner, repo);
            const repoStructure = await getRepoStructure(owner, repo);
            const formattedOutput = formatOutput(repoInfo, repoStructure);
            return {
                content: [
                    {
                        type: "text",
                        text: formattedOutput,
                    },
                ],
            };
        }
        catch (error) {
            console.error("Error mapping repository:", error);
            return {
                content: [
                    {
                        type: "text",
                        text: `Error mapping repository: ${error.message}`,
                    },
                ],
            };
        }
    }
    else {
        throw new Error(`Unknown tool: ${name}`);
    }
});
function parseGitHubUrl(url) {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
        throw new Error("Invalid GitHub URL format");
    }
    return { owner: match[1], repo: match[2] };
}
async function getRepoInfo(owner, repo) {
    if (!octokit) {
        throw new Error("GitHub client not initialized");
    }
    const { data } = await octokit.repos.get({ owner, repo });
    return {
        name: data.name,
        description: data.description,
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
    };
}
async function getRepoStructure(owner, repo, path = "") {
    if (!octokit) {
        throw new Error("GitHub client not initialized");
    }
    const { data } = await octokit.repos.getContent({ owner, repo, path });
    if (!Array.isArray(data)) {
        throw new Error("Unable to retrieve repository structure");
    }
    const structure = {};
    for (const item of data) {
        if (item.type === "file") {
            structure[item.name] = null;
        }
        else if (item.type === "dir") {
            structure[item.name] = await getRepoStructure(owner, repo, item.path);
        }
    }
    return structure;
}
function formatOutput(repoInfo, repoStructure) {
    const structureString = JSON.stringify(repoStructure, null, 2);
    return `
Repository Analysis Summary:

Name: ${repoInfo.name}
Description: ${repoInfo.description || "No description provided"}
Stars: ${repoInfo.stars}
Forks: ${repoInfo.forks}
Primary Language: ${repoInfo.language}
Created: ${new Date(repoInfo.createdAt).toLocaleDateString()}
Last Updated: ${new Date(repoInfo.updatedAt).toLocaleDateString()}

Repository Structure:

${structureString}
  `.trim();
}
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("GitHub Mapper MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
