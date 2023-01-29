// import { useCallback } from "react";
import { Octokit } from "octokit";

const octokit = new Octokit({ });

export const useOctokit = () => {
	
	const reqestOctokit = 
	// useCallback(
		async (owner: string, repo: string) => {
		return await octokit.request("GET /repos/{owner}/{repo}", {
			owner: owner,
			repo: repo,
		})
	}
	// , []);

	return {reqestOctokit};
}