import axios from "axios";
import { getAuth } from "firebase/auth";

let production = false;

const auth = getAuth();

if (window.location.hostname === "localhost") {
  production = true;
}

export const url = production ? "http://localhost:4000/" : serverURI;
export const apiInstance = axios.create({
  baseURL: url,
});

export const serverURI = "https://calm-basin-92563.herokuapp.com/";
