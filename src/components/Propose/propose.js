import React, { useState, useContext } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { AppStateContext, proposePrice } from "../../App";

const Proposal = (props) => {
  const { proposalData, setproposalData } = useContext(AppStateContext);

  const btnVideo = (event) => {
    event.preventDefault();
  };

  return (
    <div className="main-proposal-div ">
      {proposalData.map((proposal) => {
        return (
          <div className="proposal-div inline" key={proposal.proposer}>
            <div className="proposal-des inline">
              {proposal.description.slice(0, 10)}...
            </div>
            <div className="proposal-video inline">
              <button src="www.google.com">Video</button>
            </div>
            <div className="proposal-address inline">
              {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(38)}
            </div>
            <div className="proposal-report inline">
              <a
                // href={"#"}
                onClick={() =>
                  proposePrice(123, 0, props.contract, props.account)
                }
              >
                Report
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Proposal;
