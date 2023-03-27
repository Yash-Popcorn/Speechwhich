import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Navbar from "./components/Navbar";
import { useReward } from 'react-rewards';

const versions = new Map<string, string>([
  ["Spanish", "es-US"],
  ["English", "en-US"],
  ["French", "fr-FR"],
])


export default function Learn() {
    const router = useRouter()
    const { language, topic } = router.query as {
      language: "Spanish" | "English" | "French",
      topic: string
    }
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState(new Array<string>())
    const { reward, isAnimating } = useReward('rewardId', 'confetti', {
      zIndex: 10000000,

    });
    const [time, setTime] = useState([0, 0])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
      
      const askQuestion = () => {
        fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt:
              `Imagine you are a robot and your name is Ranjith. You are a bot that will ask a question about the topic ${topic}. There is no response currently. Return a question you are asking. Reply with the question only`,
            temperature: 0.7,
            max_tokens: 1421,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          const answer: string = data.choices[0].text;
          setQuestion(answer.replace(".", ""))
        });
      }
      useEffect(() => {
        askQuestion()
      }, [])

      const submitHandle = () => {
        reward()
        fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt:
              `You are a robot named Ranjith. You asked the question to the user: ${question}. They answered: ${transcript}. Based on this information return a json for the fields [relevancy, feedback, toxicity, grammar, tone]. Relevancy is range from 0%, 25%, 50%, 100% on how much the question relates to answer. Feedback is how they can improvise on the sentence and vocabulary words they can use in the language ${language} and what they mean in English and explain how they can be relevant to the information. Provide vocabulary words they can use in the Feedback field. Toxicity is how the toxic the answer the user gave from is range from 0%, 25%, 50%, 100%. Grammar is how grammatically the answer the user gave from is range from 0%, 25%, 50%, 100% They were supposed to answer in the language ${language}. The tone is from the level of [angry, persuasive, calm, arrogant, sad, humourous] If they said some other language all fields will return an empty string. Respond with the fields seperated by a semi colon`,
            temperature: 0.7,
            max_tokens: 1421,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          const answer: string = data.choices[0].text.replace(".", "")
          const arr = answer.split(";")
          setResponse(arr)
          askQuestion()
        });
      }
      
      useEffect(() => {
        if (listening) {
          setTime([new Date().getSeconds(), 0])
        } else {
          setTime([time[0], new Date().getSeconds()])
        }
      }, [listening])
      
      return (
        <div>
          <Navbar/>
          <div style={{
            margin: "auto",
            textAlign: "center",
            maxWidth: "30%",
            top: 10,
            left: 60,
            position: "relative"
          }}>
            <h4 style={{
              textAlign: "center",
              position: "relative",
              right: 80
            }}>
              {`Start by giving an answer to the question: ${question}`}
            </h4>
            <div className="grid">
              <input style={{
                color: "black",
                backgroundColor: "white",
                width: 1000,
                position: "relative",
                right: 230
              }} placeholder="Provide some information..." readOnly value={transcript}>
              </input>
              <button
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "100%",
                  position: "relative",
                  left: 500,
                  top: 5,
                  backgroundColor: "white",
                  backgroundImage: "url(https://cdn-icons-png.flaticon.com/512/1082/1082810.png)",
                  backgroundSize: "75%",
                  backgroundPositionX: 8,
                  backgroundPositionY: 6,
                  boxShadow: "0 3px 10px #fff",
                  
                }}
               onClick={() => {
                  SpeechRecognition.startListening({ language: versions.get(language || "") || "" })
               }}/>
               
            </div>
            <button
              style={{
                background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                right: 65,
                position: "relative"
              }}
              onClick={() => {
                submitHandle()
              }}
              disabled={isAnimating}
            >
              Submit
              <span id="rewardId"/>
            </button>

            {
            response.length == 0 ?
            (
              <div/>
            ): (
              <article style={{
                right: 70,
                position: "relative"
              }}>
                {
                  response.map((value) => {
                    return <header style={{
                      fontWeight: "bold"
                    }}>
                      {value.replace("{", "").replace("}", "").replace('"', "").replace('"', "").replace(".", "").replace(",", "")}
                    </header>
                  })
                }
                <header style={{
                      fontWeight: "bold"
                    }}>
                      {`Time taken to record: ${time[1] - time[0]} seconds`}
                </header>
              </article>
            )
              }
          </div>
        </div>
      );
}