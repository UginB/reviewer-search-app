import { Octokit } from "octokit";

const octokit = new Octokit({ });

export const reqestOctokit = 
	async (owner: string, repo: string) => {
	return await octokit.request("GET /repos/{owner}/{repo}", {
		owner: owner,
		repo: repo,
	})
}