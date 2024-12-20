# GitHub Mapper MCP Server

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

### 1. set-github-token

Sets the GitHub Personal Access Token for authentication.

Input schema:
```json
{
  "token": "your-github-personal-access-token"
}
```

Example usage:
```json
{
  "name": "set-github-token",
  "arguments": {
    "token": "ghp_your_personal_access_token"
  }
}
```

### 2. map-github-repo

Maps a GitHub repository structure and provides summary information.

Input schema:
```json
{
  "repoUrl": "https://github.com/username/repo"
}
```

Example usage:
```json
{
  "name": "map-github-repo",
  "arguments": {
    "repoUrl": "https://github.com/octocat/Hello-World"
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

## Error Handling

- If the GitHub token is not set, you'll receive an error message prompting you to use the `set-github-token` tool first.
- Invalid GitHub URLs or repository paths will result in appropriate error messages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
