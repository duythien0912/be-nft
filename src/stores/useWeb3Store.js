import createStore from "zustand";
import persist from "../utils/persist";
import Web3 from "web3";
import { config } from "../web3/config";

const useWeb3Store = createStore(
  persist(
    {
      key: "web3",
      allowlist: ["wasConnectMetaMask"],
      //   denylist: ["isLoading", "errorMessage", "web3"],
    },
    (set, get) => ({
      isLoading: false,

      isWarningWallet: false,

      isShowConnectWalletSuccess: false,

      wasConnectMetaMask: false,

      errorMessage: "",

      web3: new Web3("https://data-seed-prebsc-1-s1.binance.org:8545"), // test net

      bePublicContract: null,

      userAddress: "",

      beUserContract: null,

      ethereum: window.ethereum,

      nft: [],

      // Setup web3 bsc connect provider
      init: () => {
        window.web3 = new Web3(
          "https://data-seed-prebsc-1-s1.binance.org:8545"
        );

        var _bePublicContract = new (get().web3.eth.Contract)(
          config.couponFactoryAbi,
          config.couponFactoryAddress
        );

        set((_state) => ({
          bePublicContract: _bePublicContract,
        }));

        if (get().wasConnectMetaMask) {
          get().initMetaMask();
        }
      },

      // Setup MetaMask connect
      initMetaMask: async () => {
        try {
          console.log("initMetaMask");

          await window?.ethereum?.enable();

          // 56 - bsc mainnet
          // 96 - bsc testnet
          if (
            window?.ethereum == null ||
            window?.ethereum?.networkVersion !== "97"
          ) {
            return set((_state) => ({
              isWarningWallet: true,
            }));
          }

          var _eth = new Web3(window?.ethereum).eth;
          var _getAccounts = await _eth.getAccounts();

          var _userAddress = _getAccounts[0];

          var _beUserContract = new (get().web3.eth.Contract)(
            config.couponFactoryAbi,
            config.couponFactoryAddress,
            { from: _userAddress }
          );

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          if (_userAddress && _beUserContract)
            set((_state) => ({
              userAddress: _userAddress,
              beUserContract: _beUserContract,
              isShowConnectWalletSuccess: get().wasConnectMetaMask
                ? false
                : true,
              wasConnectMetaMask: true,
            }));
        } catch (e) {
          console.log("ERROR initContract: ", e);
          set((_state) => ({
            wasConnectMetaMask: false,
          }));
        }
      },

      // Setup WalletConnect
      initWalletConnect: async () => {
        return;
      },

      // Close warning model
      closeModel: () => {
        set((_state) => ({
          isWarningWallet: false,
        }));
      },

      // Close Connect Wallet model
      closeConnectWalletModel: () => {
        set((_state) => ({
          isShowConnectWalletSuccess: false,
        }));
      },

      // Clear all data
      clear: () => {
        set((_state) => ({
          isLoading: false,
          errorMessage: "",
          userAddress: null,
          web3: new Web3("https://data-seed-prebsc-1-s1.binance.org:8545"),
          bePublicContract: null,
          beUserContract: null,
          ethereum: window?.ethereum || null,
          nft: [],
        }));
      },
    })
  )
);

export default useWeb3Store;
