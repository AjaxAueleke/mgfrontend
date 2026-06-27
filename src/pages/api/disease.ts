// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "RAPIDAPI_KEY is not configured" });
  }

  try {
    const options = {
      method: "GET",
      url: "https://medius-disease-medication.p.rapidapi.com/api/v2/disease-medications/E_0000017290",
      params: { country: "IN" },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "medius-disease-medication.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(502).json({ error: "lookup unavailable" });
  }
}
