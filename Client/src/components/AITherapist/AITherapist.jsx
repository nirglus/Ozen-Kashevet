import { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import { API_KEY } from "../../config/openAIConfig";
import ai_logo from '../../assets/img/AI-Therapist.png'
import logo from '../../assets/img/Anonimos.png'



function AITherapist() {
    const openai = new OpenAI({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true
    });

    const [userInput, setUserInput] = useState("");
    const [therapistResponses, setTherapistResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const refScroll = useRef();

    const callOpenAIAPI = async () => {
        if (userInput.trim() === "") return;

        const newResponses = [...therapistResponses, { role: "user", content: userInput }];
        setTherapistResponses(newResponses);
        setUserInput("");
        setIsLoading(true);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "Act as a professional therapist, you'll chat with the user and receive from him info about his mental problems. They can be Israeli warriors, Israeli citizen who exeperienced bad things and saw awful videos. Now I want you to help them as much as possible and tell them that we have therapists in 'Ozen Kashevet' that they can arrange meeting with them in order to chat. To arrange meetings send them to the dashboard in the app, and tell them to open the Schedule a Therapist and check in when they are available."
            }, ...newResponses],
            temperature: 0.7,
            max_tokens: 500,
            top_p: 1,
            stop: "system"
        });

        const therapistResponse = response.choices[0].message.content;
        setTherapistResponses([...newResponses, { role: "system", content: therapistResponse }]);
        setIsLoading(false);
    };

    useEffect(() => {
        refScroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [therapistResponses]);

    return (
        <>
            <div className="h-[50%] w-full border p-2 border-black overflow-y-scroll" id="chatPanel">
                {therapistResponses.map((message, index) => (
                    <div ref={refScroll} key={index} style={{ marginBottom: "10px" }}>
                        {message.role === "user" ?(
                            
                            <div>
                                <strong className="flex items-center"><img className="w-8 h-8 rounded-full object-cover mr-1" src={logo}/>You:</strong> <div className="p-4 rounded-lg bg-blue-300 text-gray-800 mt-2">{message.content}</div>
                            </div>
                        ) : (
                            <div>
                                    <strong className="flex items-center"><img className="w-8 h-8 rounded-full object-cover mr-1" src={ai_logo}/>AI Therapist:</strong> <div className="p-4 rounded-lg bg-green-300 text-gray-800 mt-2">{message.content}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <input className="w-[90%] h-10 border border-black p-2" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Please feel free to share with me what you feel'/>
                <button className="bg-green-500 p-2 border border-black" onClick={callOpenAIAPI}>Send</button>
            </div>
        </>
    );
}

export default AITherapist;