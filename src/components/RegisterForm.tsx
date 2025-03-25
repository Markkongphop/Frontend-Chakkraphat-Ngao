"use server"
export default async function RegisterForm(
  userName: string,
  userTel: string,
  userEmail: string,
  userPassword: string
) {
  const response = await fetch( "https://backend-eta-ashy.vercel.app/api/v1/auth/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        telnumber: userTel,
        email: userEmail,
        password: userPassword,
        role: "user",
      }),
    });

  if (!response.ok) {
    console.log("name== "+userName)
    console.log("tel== "+userTel)
    console.log("email== "+userEmail)    
    console.log("Pw== "+userPassword)
    throw new Error("Registration failed. Please try again.");
  }

  return await response.json();
}