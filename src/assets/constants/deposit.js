import { Client as bitcoinCashClient, BCH_DECIMAL } from '@xchainjs/xchain-bitcoincash';
import { Client as bitcoinClient} from "@xchainjs/xchain-bitcoincash"
import { Client as binanceClient} from "@xchainjs/xchain-binance"
import { Client as ethereumClient, ETH_DECIMAL} from "@xchainjs/xchain-ethereum"
import { Client as litecoinClient, LTC_DECIMAL} from "@xchainjs/xchain-litecoin"
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain"
import { AssetBCH, AssetETH, AssetLTC, AssetBTC, AssetBNB, assetToBase, assetAmount, AssetRuneNative } from '@xchainjs/xchain-util';

import { Network } from '@xchainjs/xchain-client';

const BCH_contract_address = "qz5fma7jqm4amplztqc63zd98xatly6aaqz0uk520w";
const BCH_fee = +3;

const BTC_contract_address = "bc1qg4lx5fhl2ampzp4na8tp5ju0am2dqznn28hxhu";
const BTC_fee = +11250;

const LTC_contract_address = "ltc1qcd5akjsefkdglscktwwd6nlsdxrd78fgjm4zjg";
const LTC_fee = +247;

const ETH_contract_address = "0x1f42326414e8f6a37026890d1992fe4bd28ede81";
const ETH_fee = +120;

const BNB_contract_address = "tbnb14zwl05sxa0wc0cjcxx5gnffeh2lexh0gamy9ca";
const BNB_fee = +11250;

const BUSD_contract_address = "tbnb122wuescegyq3q47jfthzqvtk7f32j422lze084"

export const deposit_btc = async(phrase, amount) => {
    const network = Network.Testnet;
    const client = new bitcoinClient({network, phrase});
    const BTC_address = client.getAddress();
    console.log(BTC_address, "addres")
    const memo = `+:${AssetBTC.chain}.${AssetBTC.symbol}:${BTC_address}`;
    const txID = await client.transfer({
        asset: AssetBTC,
        amount: assetToBase(assetAmount(amount,8)),
        recipient: BTC_contract_address,
        memo,
        feeRate: BTC_fee,
    });
}

export const deposit_bch = async(phrase, amount) => {
    const network = Network.Testnet;
    const client = new bitcoinCashClient({network, phrase});
    const BCH_address = client.getAddress();
    const memo = `+:${AssetBCH.chain}.${AssetBCH.symbol}:${BCH_address}`;
    const txID = await client.transfer({
        asset: AssetBCH,
        amount: assetToBase(assetAmount(amount, BCH_DECIMAL)),
        recipient: BCH_contract_address, 
        memo, 
        feeRate: BCH_fee, 
    });    

}

export const deposit_ltc = async(phrase, amount) => {
    const network = Network.Testnet;
    const client = new litecoinClient({network, phrase});
    const LTC_address = client.getAddress();
    const memo = `+:${AssetLTC.chain}.${AssetLTC.symbol}:${LTC_address}`;
    const txID = await client.transfer({
        asset: AssetLTC, 
        amount: assetToBase(assetAmount(amount, LTC_DECIMAL)), 
        recipient: LTC_contract_address,
        memo,
        feeRate: LTC_fee, 
    });    
}

export const deposit_bnb = async(phrase, amount) => {
    const network = Network.Testnet;
    const client = new binanceClient({network, phrase});
    const BNB_address = client.getAddress();
    console.log(BNB_address, "bnb")
    const memo = `+:${AssetBNB.chain}.${AssetBNB.symbol}:${BNB_address}`;
    const txID =  client.transfer({
        asset: AssetBNB, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)),
        recipient: BNB_contract_address, 
        memo, 
        feeRate: BNB_fee, 
    });
}

export const deposit_busd = async(phrase, amount) => {
    const AssetBUSD = {
        "chain":"BNB",
        "symbol":"BUSD",
        "synth":false,
        "ticker":"BUSD"
    }
    const network = Network.Testnet;
    const client = new binanceClient({network, phrase});
    const BNB_address = client.getAddress();
    const memo = `+:${AssetBUSD.chain}.${AssetBUSD.symbol}:${BNB_address}`;
    const txID =  client.transfer({
        asset: AssetBUSD, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)),
        recipient: BUSD_contract_address, 
        memo, 
        feeRate: BNB_fee, 
    });
}

export const deposit_usdt = async(phrase, amount) => {
    const network = Network.Testnet;
    const AssetUSDT = {
        "chain":"ETH",
        "symbol":"USDT",
        "synth":false,
        "ticker":"USDT"
    }
    const client = new ethereumClient({network, phrase});
    const ETH_address = client.getAddress();
    const memo = `+:${AssetUSDT.chain}.${AssetUSDT.symbol}:${ETH_address}`;
    const txID = await client.transfer({
        asset: AssetUSDT, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)), 
        recipient: ETH_contract_address,
        memo, 
        feeRate: ETH_fee,
    });
}


export const deposit_eth = async(phrase, amount) => {
    const network = Network.Testnet;
    const client = new ethereumClient({network, phrase});
    const ETH_address = client.getAddress();
    const memo = `+:${AssetETH.chain}.${AssetETH.symbol}:${ETH_address}`;
    const txID = await client.transfer({
        asset: AssetETH, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)), 
        recipient: ETH_contract_address,
        memo, 
        feeRate: ETH_fee,
    });
}

export const deposit_rune = async(phrase, amount) => {
    const network = Network.Testnet;
    const chainIds = {[Network.Mainnet]: 'thorchain-mainnet-v1', [Network.Stagenet]: 'thorchain-stagenet-v1', [Network.Testnet]: 'thorchain-testnet-v2'}
    console.log(AssetRuneNative, "native")
    const client = new thorchainClient({ network, phrase, chainIds });
    const RUNE_address = client.getAddress();
    console.log(amount, RUNE_address,client, AssetRuneNative.chain, AssetRuneNative.symbol,"why")
    const memo =  `+:${AssetRuneNative.chain}.${AssetRuneNative.symbol}:${RUNE_address}`;
    try{
        const txID = await client.deposit({
            amount:  assetToBase(assetAmount(amount, 8)), 
            memo, 
        });
    } catch(e) {
        console.log(e, "error")
    }
}