import { referenceVariableData } from "../utils/stores";

const userRecord = [];
const fileData = [];

export async function setRecord(referenceVariable, key, value) {
  try {
    if (referenceVariable === referenceVariableData.localStorage) {
      userRecord.push(value);
      const stringifyData = JSON.stringify(userRecord);
      localStorage.setItem(key, stringifyData)
    }
    return userRecord;
  } catch (error) {
    console.error("error from setData>>", error);
  }
}

export async function getRecord() {
  try {
    const getData = localStorage.getItem("user");
    let userRecord = [];
    if (getData !== null) {
      const parseData = JSON.parse(getData);
      userRecord = parseData;
    }
    return userRecord;

  } catch (error) {
    console.error("error from get user data>>", error);
  }
}

// File Transmission of data

export async function setUploadedFileData(file){
 try{
   fileData.push(file);
   console.log("set fileData>>",fileData)
  return fileData;
 }catch(err){
console.error("error from set record>>", err);
 }
}

export async function getUploadedFile(){
  try{
    console.log("get fileData>>",fileData)
  return fileData;
  }catch(err){
    console.error("error from get record");
  }
}


// View file records

export const setFileDetails =(file) => {
 localStorage.setItem("file", JSON.stringify(file));
}

export const getFileDetails = () => {
  const getFile = localStorage.getItem("file");
  if(getFile !== null){
    return JSON.parse(getFile);
  }
}