import { useState, useEffect } from "react";
import OpenAI from "openai";
import { API_KEY } from "../../config/openAIConfig";

function AITherapist() {
    const openai = new OpenAI({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true
    });

    const [userInput, setUserInput] = useState("");
    const [therapistResponses, setTherapistResponses] = useState([]);

    const callOpenAIAPI = async () => {
        if (userInput.trim() === "") return;

        const newResponses = [...therapistResponses, { role: "user", content: userInput }];
        setTherapistResponses(newResponses);
        setUserInput("");

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: newResponses,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 1,
            stop: "system"
        });

        const therapistResponse = response.choices[0].message.content;
        setTherapistResponses([...newResponses, { role: "system", content: therapistResponse }]);
    };

    useEffect(() => {
        const scrollToBottom = () => {
            const chatPanel = document.getElementById("chatPanel");
            if (chatPanel) {
                chatPanel.scrollTop = chatPanel.scrollHeight;
            }
        };

        scrollToBottom();
    }, [therapistResponses]);

    return (
        <>
            <div id="chatPanel" style={{ height: "600px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
                {therapistResponses.map((message, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        {message.role === "user" ? (
                            <div>
                                <strong>You:</strong> {message.content}
                            </div>
                        ) : (
                            <div>
                                <strong>AI Therapist:</strong> {message.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: "10px" }}>
                <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Please feel free to share with me what you feel' cols="50" rows="3"></textarea>
                <br />
                <button onClick={callOpenAIAPI}>Send</button>
            </div>
        </>
    );
}

export default AITherapist;
