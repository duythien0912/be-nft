import Web3 from "web3";
import { config } from "./config";

export async function initContract() {
  try {
    window.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    await window.ethereum.enable();

    window.userAddress = (await window.web3.eth.getAccounts())[0];

    window.couponFactory = new window.web3.eth.Contract(
      config.couponFactoryAbi,
      config.couponFactoryAddress,
      { from: window.userAddress }
    );

    window.ethInitialized = true;

    // window.ethereum.on("accountsChanged", () => {
    //   window.location.reload();
    // });
  } catch (e) {
    console.log("ERROR initContract: ", e);
  }
}
export async function initContractWithOutAccount() {
  try {
    window.web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

    //   window.userAddress = (await window.web3.eth.getAccounts())[0];

    window.couponFactory = new window.web3.eth.Contract(
      config.couponFactoryAbi,
      config.couponFactoryAddress
      // { from: window.userAddress }
    );

    // window.ethInitialized = true;
    // await window.ethereum.enable();

    //   window.ethereum.on("accountsChanged", () => {
    //     window.location.reload();
    //   });
  } catch (e) {
    console.log("ERROR initContract: ", e);
  }
}
