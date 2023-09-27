import {request} from "../../core/api/request";

export const sbApi = async (input: any) =>
  await request
    .post<any>("http://localhost:3000/stable-diffusion-integration", {
      params: {
        prompt: input,
      },
    })
    .then(response => response.data);
