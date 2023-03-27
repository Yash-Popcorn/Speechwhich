import { useRouter } from "next/router"

export default function Navbar() {
  const route = useRouter()

    return (
        <nav style={{
            backgroundColor: "white"
          }}>
            <ul style={{
              position: "relative",
              left: 10
            }}>
              <li style={{
                color: "black"
              }}><strong>Speechwich AI</strong></li>
            </ul>
            <ul style={{
              position: "relative",
              right: 20,
            }}>
            </ul>
            <button style={{
              backgroundColor: "rgb(255, 0, 102)",
              maxWidth: "15%",
              position: "relative",
              top: 10,
              right: 10
            }} onClick={() => {
              route.push('/dashboard')
            }}>
              Dashboard
            </button>
          </nav>
    )
}