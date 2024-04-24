import axios from "axios";

async function instance(){

  return axios.create({
    baseURL: "http://127.0.0.1:3500/atthemoment/v1/counter/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    },
  });

}

//Optimize and create once
//Put in a function

export default instance;