import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import { Request, Response } from "express";
import { asyncWrapper, CustomError } from "../utils";

interface Translate {
  text: string;
  from: string;
  to: Array<string>;
}

interface TranslateText {
  text: string;
  to: string;
}

interface TranslationResult {
  translations: Array<TranslateText>;
}

export const getTranslation = asyncWrapper( async (
  req: Request,
  res: Response
): Promise<void> => {
  let text: string = req.body.text;
  let from: string = req.body.from;
  let to: Array<string> = req.body.to;

  if(!text || !to){
    throw new CustomError('Please enter a valid text to translate and language to translate to', 400);
  }

  const response = await translator({text, from, to});

  if(!response){
    throw new CustomError('An error ocurred, try again', 400);
  }
  
  let data: Array<TranslateText> = response["translations"]
  res.status(200).json(data);
  
});



const translator = async (translate: Translate): Promise<TranslationResult | undefined> => {
  try {
    let key = process.env.AZURE_KEY1;
    let endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;

    let params = new URLSearchParams();
    params.append("api-version", "3.0");
    params.append("from", translate.from || "en");
    console.log(translate)
    translate.to.forEach((lang) => params.append("to", lang));

    const response: AxiosResponse<any> = await axios({
      baseURL: endpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: params,
      data: [{ text: translate.text }],
      responseType: "json",
    });

    return response.data[0];
  } catch (error: any) {

    type AxiosErrorType = { message: string, statusCode: number}

    if(axios.isAxiosError(error)){
      const typedError: AxiosErrorType = { message: error.message, statusCode: error.response?.status || 500
    }

    console.log(typedError);
    

    } else {
      console.log(error.message);
    }
  }
};