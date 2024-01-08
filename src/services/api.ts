import env from "@/config/env";
import axios from "axios";

export const apiServer = axios.create({
  baseURL: env.reactAppServer || 'http://10.0.13.21:4000',
})