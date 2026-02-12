import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    // Initialize user state from localStorage
    const [user, setUser] = useState(
        localStorage.getItem("currentUserEmail")
            ? { email: localStorage.getItem("currentUserEmail") }
            : null
    );

    // Sign up function
    const signUp = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if user exists
        if (users.find((u) => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }

        const newUser = { email, password };
        users.push(newUser);

        // Save users array to localStorage
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);

        setUser({ email });

        return { success: true };
    };

    // Login function
    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: "Invalid email or password" }
        }
        localStorage.setItem("currentUserEmail", email);
        setUser({ email })

        return { success: true }
    };

    const logout = () => {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
