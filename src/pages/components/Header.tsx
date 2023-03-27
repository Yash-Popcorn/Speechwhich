import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Navbar from "./Navbar"

export default function Header() {
    const { data: session } = useSession()
    const route = useRouter()

    async function handleSignIn() {
        if (session) return route.push('/dashboard')

        const result = await signIn('google')
        if (result?.ok) {
          // Sign in was successful
          route.push("/dashboard")
        } else {
          // Sign in was not successful
          route.push("/")
        }
      }

    return (
    <div>
        <div onClick={() => {
          route.push('/dashboard')
        }}>
        <h1 style={{
            position: "relative",
            margin: "auto",
            textAlign: "center",
            top: 30
        }}>
            Speechwich AI
        </h1>
        </div>
        <h4 style={{
            position: "relative",
            margin: "auto",
            textAlign: "center",
            top: 20,
            color: "gray",
            marginBottom: 60
        }}>
            Language Speaking Made Easier
        </h4>
        <button style={{
            maxWidth: "30%",
            margin: "0 auto",
            fontWeight: "bold",
            boxShadow: "0px 0px 8px 4px rgba(27, 243, 75, 0.5)",
            backgroundColor: "#1FFF50"
        }} onClick={handleSignIn}>
            Start Now
        </button>
    </div>
  )  
}