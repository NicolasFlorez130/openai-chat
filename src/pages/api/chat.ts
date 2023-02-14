import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration } from 'openai';
import { OpenAIApi } from 'openai/dist/api';
import { responseCodes } from './_codes';

let active_searches = 0;

const max_active_users = 50000;

const config = new Configuration({
   apiKey: process.env.OPENAI_KEY,
});

const openAi = new OpenAIApi(config);

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<{ response?: string; error?: string; code: responseCodes }>
) {
   active_searches++;

   const sendError = (error: string, code: responseCodes, status: number) => {
      active_searches--;

      res.status(status).json({
         response: error,
         code,
      });
   };

   if (active_searches > max_active_users) {
      sendError('Maximum petitions at same time reached', responseCodes.appError, 500);
   } else {
      if (!config.apiKey) {
         sendError('OpenAi token unexpectedly not found', responseCodes.appError, 500);
      }

      if (!req.query.string) {
         sendError('Query string empty', responseCodes.userError, 400);
      }

      try {
         const response = await openAi.createCompletion({
            model: 'text-davinci-003',
            prompt: req.query.string,
            temperature: 0.5,
         });

         active_searches--;

         res.status(200).json({
            response: response.data.choices.at(0)?.text ?? '',
            code: responseCodes.success,
         });
      } catch (error) {
         sendError('An unexpected error has ocurred', responseCodes.appError, 500);
      }
   }
}
