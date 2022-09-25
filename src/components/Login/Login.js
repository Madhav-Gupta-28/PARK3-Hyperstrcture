// import React, { useState, useContext } from "react";
// import park3img from "../../images/1.svg";
// import metamaskimg from "../../images/metamask.png";
// import "../../App.css";
// import { AppStateContext } from "../../App";
// import Home from "../Home/Home";
// import {useEffect} from ".";
//
// const Login = (props) => {
//   const ethereum = window.ethereum;
//
//   let contract = props.contract;
//   let account = props.account;
//   let web3Obj = props.web3Obj;
//   const { setlogin, login } =
//       useContext(AppStateContext);
//
//   useEffect(() => {
//
//     async function load() {
//       const isReg = await contract.methods.isRegistered(account).call();
//     }
//
//     load();
//   }, [])
//
//   return (
//     <>
//       {!login ? (
//         <div className="min-w-full h-screen back-color  ">
//           <h1 className="textcolor h1-park3 pt-5  ">PARK-3</h1>
//           <img src={park3img} className="center " />
//
//           <div className="login-div w-1/3 h-40 mt-4  bg-opacity-70 p-2 rounded-lg shadow-lg border-opacity-60 border-4  flex flex-col justify-center items-center">
//             <h1 className=" text-2xl font-medium text-center">Login</h1>
//
//             <div
//               onClick={metamaskConnect}
//               className="flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2  cursor-pointer  text-white mt-4 rounded-lg justify-center items-center py-1 px-2"
//             >
//               Connect With Metamask
//               <img className="h-12" src={metamaskimg} />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Home />
//       )}
//     </>
//   );
// }
//
// export default Login;
