import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	// request loading
	const [requests, setRequests] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: "" });

	const searchGithubUsers = async (user) => {
		toggleError();
		setLoading(true);
		const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
			console.log(err)
		);
		if (response) {
			setGithubUser(response.data);
			const { login, followers_url } = response.data;
			//repos
			axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
				setRepos(response.data)
			);
			//followers
			axios(`${followers_url}?per_page=100`).then((response) =>
				setFollowers(response.data)
			);
		} else {
			toggleError(true, "no such username exists");
		}
		checkRequests();
		setLoading(false);
	};
	// check requests
	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(({ data }) => {
				let { rate } = data;
				let { remaining } = rate;
				setRequests(remaining);
				if (remaining === 0) {
					toggleError(true, "Sorry, you have reached your hourly rate limit!");
				}
			})
			.catch((err) => console.log(err));
	};
	function toggleError(show = false, msg = "") {
		setError({ show, msg });
	}
	useEffect(() => {
		checkRequests();
	}, []);
	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				error,
				searchGithubUsers,
				loading,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubContext, GithubProvider };
