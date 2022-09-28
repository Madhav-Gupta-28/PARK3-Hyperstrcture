import React, { useState, useContext, useRef } from "react";
import "../../App.css";
import { AppStateContext } from "../../App";
import Header from "../Header/Header";
import Proposal from "../Propose/propose";

const ProposeList = (props) => {
  const { proposalData, setproposalData } = useContext(AppStateContext);
  return (
    <>
      <div className=" back-color proposelist">
        <Header heading="Proposes" />

        <div className="div-list">
          <Proposal
            contract={props.contract}
            account={props.account}
            web3Obj={props.web3Obj}
          />
        </div>
      </div>
    </>
  );
};

export default ProposeList;
