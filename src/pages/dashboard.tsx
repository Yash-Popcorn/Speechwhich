import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function dashboard() {
    const { data: session } = useSession()
    const topics = ["Food", "Hotel", "Video Games", "Nature", "Vacation", "Favorite Subject", "Favorite Color", "Music", "Travel", "Sports", "Hobbies", "Books", "Animals", "Weather", "School", "Technology", "Shopping", "Movies and TV", "Economy", "Health"];
    const languages = ["Spanish", "English", "French"]
    const chunkSize = 4;
    const chunks = [];
    const route = useRouter()
 
    const [language, setLanguage] = useState("")

    for (let i = 0; i < topics.length; i += chunkSize) {
        chunks.push(topics.slice(i, i + chunkSize));
    }

    const handleClick = (lang: string) => {
        setLanguage(lang)
    }

    const handleArticleClick = (topic: string) => {
        window.localStorage.setItem("visited", (localStorage.getItem("visited") || "") + topic)
        route.push({
            pathname: "/learn",
            query: {
                language: language,
                topic: topic
            }
        })
    }

    return (<div>

            <nav>
            <details role="list" style={{
                margin: "auto",
                textAlign: "center",
                position: "relative",
                top: 10
            }}>
                <summary aria-haspopup="listbox">{`${language === "" && "Select Language" || language}`}</summary>
                <ul role="listbox">
                    {languages.map((value) => {
                        return <li onClick={() => {
                            handleClick(value)
                        }}><a>{value}</a></li>
                    })}
                </ul>
            </details>
            </nav>
            <h1 style={{
                margin: "auto",
                textAlign: "center",
            }}>
            {`Hello ${session?.user?.name} lets learn some new information🌐`}
            </h1>
            {chunks.map(chunk => (
            <div className="grid my-grid">
                {chunk.map((value) => {
                    return <article onClick={() => {
                        handleArticleClick(value)
                    }}>
                        <header style={{
                            fontWeight: "bold"
                        }}>
                            {`${value} ${window.localStorage.getItem("visited")?.includes(value) && "☑️" || ""}`}
                        </header>
                        <img src={`/images/Images for Hackathon/${value}.png`} alt="image description"/>
                    </article>
                })}
            </div>
            ))}
            <div style={{
                marginBottom: 100,
            }}/>
            
        </div>
    )
}