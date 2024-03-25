import { useState } from "react";
import OpenAI from "openai";
import { API_KEY } from "../../config/openAIConfig";

function AITherapist() {
    const openai = new OpenAI({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true
    });

    const [userInput, setUserInput] = useState("");
    const [therapistResponse, setTherapistResponse] = useState("");

    const callOpenAIAPI = async () => {
        if (isInputRelatedToMentalHealth(userInput)) {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": `You're a compassionate therapist who has been helping people deal with emotional issues for many years. Your expertise lies in providing personalized guidance and support to individuals going through difficult times. Your task is to offer advice and support to someone seeking help with their mental health.
                        Please provide words of encouragement, strategies for coping, and ways to find inner strength and healing. Remember to approach the individual with empathy and understanding, offering them a safe space to express themselves and begin the journey towards healing.`
                    },
                    {
                        "role": "user",
                        "content": userInput
                    }
                ],
                temperature: 0.7,
                max_tokens: 500,
                top_p: 1,
                stop: "system"
            });
            const therapistResponse = response.choices[0].message.content;
            setTherapistResponse(therapistResponse);
        } else {
            setTherapistResponse("I'm a therapist bot and I'm here to provide support for mental health-related issues. If you have any concerns or questions about mental health, feel free to share, and I'll do my best to assist you.");
        }
    };

    const isInputRelatedToMentalHealth = (input) => {
        const mentalHealthKeywords = ["anxiety", "depression", "trauma", "stress", "therapy", "gaza", "war", "lost", "death", "die", "kill", "rape", "burn", "hamas", "breach", "nova"];
        return mentalHealthKeywords.some(keyword => input.toLowerCase().includes(keyword));
    };

    return (
        <>
        <div>
          <textarea onChange={(e) =>{
            setUserInput(e.target.value)
          }} placeholder='Please feel free to share with me what you feel' cols="50" rows="10"></textarea>
        </div>
        <button onClick={callOpenAIAPI}>Chat</button>
        {therapistResponse !== "" ?(
            <p>{therapistResponse}</p>
        ) : null}
        </>
    );
}

export default AITherapist;
