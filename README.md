# GitHub Mapper MCP Server

[![smithery badge](https://smithery.ai/badge/github-mapper-mcp-server)](https://smithery.ai/server/github-mapper-mcp-server)

GitHub Mapper is a Model Context Protocol (MCP) server that provides tools for mapping and analyzing GitHub repositories. It allows users to set a GitHub Personal Access Token and retrieve detailed information about a specified repository, including its structure and summary statistics.

## Features

- Set GitHub Personal Access Token for authentication
- Map and analyze GitHub repository structure
- Retrieve repository summary information (stars, forks, language, etc.)
- Provide a detailed repository file structure

## Prerequisites

- Node.js (v18.0.0 or later recommended)
- npm (comes with Node.js)
- A GitHub Personal Access Token with appropriate permissions

## Installation

### Installing via Smithery

To install GitHub Mapper for Claude Desktop automatically via [Smithery](https://smithery.ai/server/github-mapper-mcp-server):

```bash
npx -y @smithery/cli install github-mapper-mcp-server --client claude
```

### Manual Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/github-mapper-mcp-server.git
   cd github-mapper-mcp-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will run on stdio, allowing it to communicate with MCP clients.

## Available Tools

### 1. `set-github-token` 

Sets the GitHub Personal Access Token for authentication.  

- Create your Personal Access Token [here](https://github.com/settings/tokens/). Choose Tokens (classic). Scopes: repo
![image](https://github.com/user-attachments/assets/08b277a5-f121-4204-acee-47871f2d3bac)

Example, in your IDE or Claude Desktop:
   ```
   Please set-github-token to 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
   ```

### 2. `map-github-repo`  

Maps a GitHub repository structure and provides summary information.  

Example:
   ```
   Please map-github-repo https://github.com/dazeb/MCP-Github-Mapper
   ```

## Manual install in Cline or Roo-Cline MCP Client:
   ```json
   {
     "mcpServers": {
       "github-mapper": {
         "command": "node",
         "args": ["/home/user/Documents/Cline/MCP/github-mapper/build/index.js"]
       }
     }
   }
   ```

## Example Output

```
Repository Analysis Summary:

Name: Hello-World
Description: My first repository on GitHub!
Stars: 1234
Forks: 567
Primary Language: JavaScript
Created: 2023-01-01
Last Updated: 2023-06-15

Repository Structure:

{
  "src": {
    "components": {
      "Header.js": null,
      "Footer.js": null
    },
    "pages": {
      "index.js": null,
      "about.js": null
    },
    "styles": {
      "global.css": null
    }
  },
  "public": {
    "images": {
      "logo.png": null
    },
    "favicon.ico": null
  },
  "package.json": null,
  "README.md": null
}
```
## Images
![image](https://github.com/user-attachments/assets/a816314a-57aa-4674-a1eb-7b345184f5e6)  



## Running evals

The evals package loads an mcp client that then runs the index.ts file, so there is no need to rebuild between tests. You can load environment variables by prefixing the npx command. Full documentation can be found [here](https://www.mcpevals.io/docs).

```bash
OPENAI_API_KEY=your-key  npx mcp-eval src/evals/evals.ts src/index.ts
```
## Error Handling

- If the GitHub token is not set, you'll receive an error message prompting you to use the `set-github-token` tool first.
- Invalid GitHub URLs or repository paths will result in appropriate error messages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
