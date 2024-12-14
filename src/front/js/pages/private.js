import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState(null);
    const [error, setError] = useState("");

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem("token");

			if (!token) {
				setError("Token not found. You must login first!");
				return;
			}

			try {
                const response = await fetch(`${process.env.BACKEND_URL}api/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, 
                    },
                });

                if (!response.ok) {
                    const data = await response.json();
                    setError(data.msg || "Failed to fetch user identity.");
                    return;
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError("Unexpected error occurred.");
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }
	
	return (
		<div className="text-center mt-5">
			<h1>Hello {user.name}!!</h1>
			<p>
				<img src={classified} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};