import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
import { Network } from "@xchainjs/xchain-client";
import axios from "axios";

export const getPoolInfo = async (network, phrase) => {
    const chainIds = {
        [Network.Mainnet]: "thorchain-mainnet-v1",
        [Network.Stagenet]: "thorchain-stagenet-v1",
        [Network.Testnet]: "thorchain-testnet-v2",
    };
    const RUNE_client = new thorchainClient({ network, phrase, chainIds });
    const RUNE_address = RUNE_client.getAddress();

    try {
        const RUNE_list = await axios.get(
            `https://testnet.midgard.thorchain.info/v2/member/${RUNE_address}`
        );
        if (RUNE_list.data) {
            return RUNE_list.data.pools;
        } else {
            return [];
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const getPooldata_testnet = async () => {
    try {
        const data = await axios.get(
            `https://testnet.midgard.thorchain.info/v2/pools`
        );
        console.log(data.data, "test");
        if (data.data) {
            return data.data;
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const getPooldata_stagenet = async () => {
    try {
        const data = await axios.get(
            `https://midgard-stagenet.lendscape.so/v2/pools`
        );
        console.log(data.data, "stage");
        if (data.data) {
            return data.data;
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const getPooldata_chaosnet = async () => {
    try {
        const data = await axios.get(
            `https://midgard-chaosnet.lendscape.so/v2/pools`
        );
        console.log(data.data, "chaos");
        if (data.data) {
            return data.data;
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};
