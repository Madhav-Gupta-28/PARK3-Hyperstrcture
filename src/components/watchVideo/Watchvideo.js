import React, { useState, useContext } from "react";
import { VideoPlayer } from "@livepeer/react";
import { AppStateContext } from "../../App";
import "../../App.css";

function Watchvideo() {
  const { description } = useContext(AppStateContext);

  const playbackId = "bd188gp7xuhfcaj6";
  return (
    <div className="watchVideo">
      <h1>{description} </h1>
      <div>
        <VideoPlayer playbackId={playbackId} />;
      </div>
    </div>
  );
}

export default Watchvideo;
