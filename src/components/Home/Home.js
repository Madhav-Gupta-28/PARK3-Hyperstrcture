import React, { useContext, useState, useRef, useEffect } from "react";
import {
  AppStateContext,
  registerContendId,
  requestData,
  setAncillaryData,
} from "../../App";
import * as tus from "tus-js-client";
import { createReadStream } from "fs-web";
import "../../App.css";
import Header from "../Header/Header";
import Qrcode from "../QRCode/Qrcode";

const Home = (props) => {
  const [assetTUS, setAssetTUS] = useState("");
  const [Videourl, seturl] = useState("");
  const [videoFilePath, setVideoFilePath] = useState("");
  const [sendButtonPressed, setSendButtonPressed] = useState(false);

  let contract = props.contract;
  let account = props.account;
  let web3Obj = props.web3Obj;
  const {
    uploadSucess,
    setuploadSucess,
    proposalData,
    setproposalData,
    setassetid,
    assetid,

    setdescription,
  } = useContext(AppStateContext);

  const VideoFileObjectRef = useRef();
  const Descriptionref = useRef();

  useEffect(() => {
    async function fetchUrl() {
      if (videoFilePath != "") {
        let data = await getUploadURL(VideoFileObjectRef.current.value);
        setassetid(data[2]);
        setAssetTUS(data[1]);
        seturl(data[0]);
        setdescription(Descriptionref.current.value);

        setproposalData([
          ...proposalData,
          {
            proposer: account,
            description: Descriptionref.current.value,
            documentName: VideoFileObjectRef.current.value,
            progress: "OnGoing",
            documentUrl: data[0],
            id: data[1],
          },
        ]);
        console.log("AssetId in useeffect: " + data[2]);
        console.log("TUS endpoint is " + data[1]);
        console.log("Url is " + data[0]);
        console.log("VideoFileObject: ", VideoFileObjectRef.current);
      }
    }

    fetchUrl();
  }, [videoFilePath]);

  const sendBtn = async (
    _id,
    contract,
    account,
    videoFileName,
    videoObject,
    tusEndpoint,
    description
  ) => {
    await startUpload(videoObject, videoFileName, tusEndpoint);
    console.log("Using description " + description);
    requestData(_id, description, contract, account);
    setuploadSucess(true);
  };
  async function startUpload(videoObject, videoFileName, tusEndpoint) {
    console.log("All: " + videoFileName + " ", videoObject, " " + videoObject);
    const upload = new tus.Upload(videoObject, {
      endpoint: tusEndpoint, // URL from `tusEndpoint` field in the `/request-upload` response
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: videoFileName,
        filetype: "video/mp4",
      },
      uploadSize: videoObject.size,
      onError(err) {
        console.error("Error uploading file:", err);
      },
      onProgress(bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log("Uploaded " + percentage + "%");
      },
      onSuccess() {
        console.log("Upload finished:", upload.url);
      },
    });
    const previousUploads = await upload.findPreviousUploads();
    if (previousUploads.length > 0) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    upload.start();
  }

  return (
    <>
      {uploadSucess ? (
        <Qrcode />
      ) : (
        <div className=" h-screen back-color">
          <Header heading="UPLOAD" />
          <div className="min-w-full div-home-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-cloud-upload upload-icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
              />
            </svg>

            <h2 className="textcolor">
              Upload Files To <span className="underline">PARK3</span>
            </h2>

            {/* <div> */}
            <input
              type="text"
              required
              id="description"
              name="description"
              placeholder="Describe Content"
              ref={Descriptionref}
            />
            <h5 className="textcolor">IN</h5>
            <input
              className="inputFile"
              type="file"
              accept="video/*"
              id="video"
              name="video"
              ref={VideoFileObjectRef}
              required
              placeholder="Location"
              onChange={(e) => {
                setVideoFilePath(e?.target?.files[0]);
              }}
            />
            <button
              onClick={() => {
                sendBtn(
                  assetid,
                  contract,
                  account,
                  VideoFileObjectRef.current.value,
                  VideoFileObjectRef.current.files[0],
                  assetTUS,
                  Descriptionref.current.value
                );
              }}
            >
              Send video {assetid}
            </button>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

// require("dotenv").config();
async function getUploadURL(videoFileName) {
  try {
    const response = await fetch(
      "https://livepeer.studio/api/asset/request-upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer 6a234aef-9c9c-41a1-82ba-948e33476fa2`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: videoFileName,
        }),
      }
    );

    const { url, tusEndpoint, asset } = await response.json(); // Getting asset id

    //await storeAssetOnIPFS(`bd18c363-c8a6-45c5-a88b-170f9cfabbc7`);
    return [url, tusEndpoint, asset.id];
  } catch (error) {
    console.log(error);
  }
}

// const storeAssetOnIPFS = async function (id) {
//   await fetch(`https://livepeer.studio/api/asset/${id}`, {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer 6a234aef-9c9c-41a1-82ba-948e33476fa2`,
//       "Content-Type": "application/json",
//     },
//     body: {
//       storage: {
//         ipfs: true,
//       },
//     },
//   });
// };

export default Home;
