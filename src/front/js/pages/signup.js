import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

export const Signup = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                setMessage(data.msg || "Error al registrar");
                return;
            }

            setMessage("User created successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/login"); 
            }, 2000);
        } catch (error) {
            setMessage("Error inesperado al registrar");
        }
    };

    return (
        <div className="container">
            {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
            <main className="form-signin w-50 m-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Registrate</h1>
                <div className="form-floating">
                <input
                        id="name"
                        placeholder="Name"
                        className="form-control"
                        type="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                <label htmlFor="name" className="form-label">Name</label>
                </div>
                <div className="form-floating">
                <input
                        id="email"
                        placeholder="Email"
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                <label htmlFor="email" className="form-label">Email</label>
                </div> 
                <div className="form-floating">
                <input
                        id="password"
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                <label htmlFor="password" className="form-label">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Registrarse</button>
                <div className="mt-3">
                        <Link to="/login">Ya tienes una cuenta? Iniciar sesión</Link>
                    </div>
            </form>
            </main>
        </div>
)}