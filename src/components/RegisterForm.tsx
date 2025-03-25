// src/components/RegisterForm.ts
"use server";

export default async function RegisterForm(
    userName: string,
    userTel: string,
    userEmail: string,
    userPassword: string
) {
    try {
        const response = await fetch("https://backend-eta-ashy.vercel.app/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                role: "user",
                password: userPassword,
                telephone: userTel,
            }),
        });

        if (!response.ok) {
            console.error("Registration failed:", response.status, response.statusText);
            const errorData = await response.json();
            console.error("Error details:", errorData);
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        const result = await response.json();
        return result; // Return the response data
    } catch (error) {
        console.error("Error in RegisterForm:", error);
        throw error; // Rethrow the error to be handled in the component
    }
}