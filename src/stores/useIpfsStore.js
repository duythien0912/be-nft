import createStore from "zustand";
import ipfsClient from "ipfs-http-client";

import persist from "../utils/persist";

const useIpfsStore = createStore(
  persist(
    {
      key: "web3",
      allowlist: [],
      //   denylist: ["isLoading", "errorMessage", "web3"],
    },
    (set, get) => ({
      client: ipfsClient({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
      }),
      isUploading: false,
      addAll: async ([files = []]) => {
        if (files == null || files.length === 0) return;

        set((_state) => ({
          isUploading: true,
        }));

        await get().client.addAll(files);

        set((_state) => ({
          isUploading: false,
        }));
      },
    })
  )
);

export default useIpfsStore;
