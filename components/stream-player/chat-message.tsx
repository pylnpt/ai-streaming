"use-client";

import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import * as toxicity from '@tensorflow-models/toxicity';


interface ChatMessageProps {
    data: ReceivedChatMessage & {isToxic: boolean}
    // model: toxicity.ToxicityClassifier
};

export const ChatMessage = ({
    data, 
}: ChatMessageProps) => {
    const [checkedMessage, setCheckedMessage] = useState(data.message);
    const color = stringToColor(data.from?.name || "asderf");
    
    const threshold = 0.9;
    const toxicityLabels = [
        'identity_attack', 
        'insult', 
        'obscene', 
        'severe_toxicity', 
        'sexual_explicit', 
        'threat', 
        'toxicity'
    ];

    useEffect(() => {
        const checkToxicity = async () => {
            const toxicityInstance = toxicity;  
            const model = await toxicityInstance.load(threshold, toxicityLabels); // Load the toxicity model with the required labels
            const predictions = await model.classify(checkedMessage); // Classify the input text
            
            predictions.forEach(prediction => {
                if (prediction.results[0].match) {
                    setCheckedMessage(`Deleted due to ${prediction.label}.`)
                    console.log(`Detected ${prediction.label}`);
                }
            });
        };
        checkToxicity();
      }, [checkedMessage]);

    return (
        <div className="flex gap-2 p-2 rounded-md hover:bg.white/5">
            <p className="text-sm text-white/40">
                {format(data.timestamp, "HH:MM" )}
            </p>
            <div className="flex flex-wrap items-baseline gap-1 grow">
                <p className="text-sm font-semibold whitespace-nowrap">
                    <span className="truncate" style={{ color: color }}>
                        {data.from?.name}
                    </span>:
                </p>
                <p className="text-sm break-all">
                    {checkedMessage}
                </p>
            </div>
        </div>
    )
}
