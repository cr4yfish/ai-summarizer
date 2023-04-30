import { NextApiRequest, NextApiResponse } from "next";
import { HfInference, QuestionAnsweringOutput } from "@huggingface/inference";

interface reqData {
    question: string;
    context: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const token = process.env.HF_ACCESS_TOKEN;
    if(!token) {
        res.statusMessage = "No access token found";
        res.status(500).end();
        return;
    }

    const inference = new HfInference(token);

    const { context } = JSON.parse(req.body) as reqData;

    console.log("Summarizing context:", context);

    inference.summarization({ 
        model: "facebook/bart-large-cnn", 
        inputs: context
    }, {
        
    }).then((result: any) => {
        res.status(200).json(result);
    }).catch(async (err) => {
        console.log("Error:", err);
        res.statusMessage = err.message;
        res.status(500).end();
    });
}