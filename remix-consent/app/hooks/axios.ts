import axios from "axios"

const oryBaseUrl = "http://127.0.0.1:4433"

export const oryAxs = axios.create({
  baseURL: oryBaseUrl,
  headers: {
    Accept: "application/json",
  },
})
