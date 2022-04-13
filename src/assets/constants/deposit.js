import { Client as bitcoinCashClient, BCH_DECIMAL } from '@xchainjs/xchain-bitcoincash';
import { Client as bitcoinClient} from "@xchainjs/xchain-bitcoincash"
import { Client as binanceClient} from "@xchainjs/xchain-binance"
import { Client as ethereumClient, ETH_DECIMAL} from "@xchainjs/xchain-ethereum"
import { Client as litecoinClient, LTC_DECIMAL} from "@xchainjs/xchain-litecoin"
import { AssetBCH, AssetETH, AssetLTC, AssetBTC, AssetBNB, assetToBase, assetAmount, AssetRuneNative } from '@xchainjs/xchain-util';

const BCH_contract_address = "qz5fma7jqm4amplztqc63zd98xatly6aaqz0uk520w";
const BCH_fee = +3;
const BCH_token_address = "qqzpe4sphx592khy2vvqhm6cm7tuuyrc65lfpqdt4e";

const BTC_contract_address = "bc1qg4lx5fhl2ampzp4na8tp5ju0am2dqznn28hxhu";
const BTC_fee = +11250;
const BTC_token_address = "thorpub1addwnpepqv0u6ux9ty2px0e3pamqryccmp80ukkj3yguaju5nwxkrz50ttahyyc0r2t";

const LTC_contract_address = "ltc1qcd5akjsefkdglscktwwd6nlsdxrd78fgjm4zjg";
const LTC_fee = +247;
const LTC_token_address = "thorpub1addwnpepqfqn8se2tkspfgegxcv8fsat7davqxasmrfq9drtf307xaq45lypgjp2nk7";

const ETH_contract_address = "0x1f42326414e8f6a37026890d1992fe4bd28ede81";
const ETH_fee = +120;
const ETH_token_address = "thorpub1addwnpepqfqn8se2tkspfgegxcv8fsat7davqxasmrfq9drtf307xaq45lypgjp2nk7";

const BNB_contract_address = "tbnb14zwl05sxa0wc0cjcxx5gnffeh2lexh0gamy9ca";
const BNB_fee = +11250;
const BNB_token_address = "tbnb1xxyhnpf7tl9pu909hmfx3m3mq62gcre20me4s0";

export const deposit_btc = async(phrase, amount) => {
    const network = Network.Testnet;
    const client = new bitcoinClient({network, phrase});
    const memo = `+:${AssetBTC.chain}.${AssetBTC.symbol}:${BTC_token_address}`;
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
    const memo = `+:${AssetBCH.chain}.${AssetBCH.symbol}:${BCH_token_address}`;
    console.log(memo, "memo")
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
    const memo = `+:${AssetLTC.chain}.${AssetLTC.symbol}:${LTC_token_address}`;
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
    const memo = `+:${AssetBNB.chain}.${AssetBNB.symbol}:${BNB_token_address}`;
    const txID =  client.transfer({
        asset: AssetBNB, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)),
        recipient: BNB_contract_address, 
        memo, 
        feeRate: BNB_fee, 
    });
}

export const deposit_eth = async(phrase, amount) => {
    const network = Network.Testnet;
    const client = new ethereumClient({network, phrase});
    const memo = `+:${AssetETH.chain}.${AssetETH.symbol}:${ETH_token_address}`;
    const txID = await client.transfer({
        asset: AssetETH, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)), 
        recipient: ETH_contract_address,
        memo, 
        feeRate: ETH_fee,
    });
}