import React, { useState, useEffect } from "react";
// ** Web3 React
import { Client as bitcoinCashClient, BCH_DECIMAL } from '@xchainjs/xchain-bitcoincash';
import { Client as bitcoinClient} from "@xchainjs/xchain-bitcoincash"
import { Client as binanceClient} from "@xchainjs/xchain-binance"
import { Client as dogeClient, DOGE_DECIMAL} from "@xchainjs/xchain-doge"
import { Client as ethereumClient, ETH_DECIMAL} from "@xchainjs/xchain-ethereum"
import { Client as litecoinClient, LTC_DECIMAL} from "@xchainjs/xchain-litecoin"
// import { Client } from '@xchainjs/xchain-thorchain';

import { AssetBCH, AssetDOGE, AssetETH, AssetLTC, AssetBTC, AssetBNB, assetToBase,assetAmount, } from '@xchainjs/xchain-util';
import { Network } from '@xchainjs/xchain-client';

// Import Material UI Components
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid';

import List from "@mui/material/List";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemIcon from "@mui/material/ListItemIcon";  
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

// Import Assets
import useStyles from "../assets/constants/styles";
import { Wallets, ConnectedWallet } from "../assets/constants/wallets";

// Import Icons
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from '@mui/icons-material/Replay';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';

import { walletconnect } from "../assets/constants/connectors";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Content = ({ phrase }) => {
    const classes = useStyles();
    const [fAmount, setFAmount] = useState(0);
    
    const BCH_contract_address = "qpzhu63xlathvygxk05avxjt3lhdf5q2wvkhx4pfeh";
    const BCH_fee = +3;
    const BCH_token_address = "thorpub1addwnpepqv0u6ux9ty2px0e3pamqryccmp80ukkj3yguaju5nwxkrz50ttahyyc0r2t";
    
    const BTC_contract_address = "bc1qg4lx5fhl2ampzp4na8tp5ju0am2dqznn28hxhu";
    const BTC_fee = +11250;
    const BTC_token_address = "thorpub1addwnpepqv0u6ux9ty2px0e3pamqryccmp80ukkj3yguaju5nwxkrz50ttahyyc0r2t";
    
    const LTC_contract_address = "ltc1qcd5akjsefkdglscktwwd6nlsdxrd78fgjm4zjg";
    const LTC_fee = +247;
    const LTC_token_address = "thorpub1addwnpepqfqn8se2tkspfgegxcv8fsat7davqxasmrfq9drtf307xaq45lypgjp2nk7";
    
    const ETH_contract_address = "0x1f42326414e8f6a37026890d1992fe4bd28ede81";
    const ETH_fee = +120;
    const ETH_token_address = "thorpub1addwnpepqfqn8se2tkspfgegxcv8fsat7davqxasmrfq9drtf307xaq45lypgjp2nk7";
   
    const DOGE_contract_address = "DNxM7iBXERpr1Y4YH6bscUjyHUVd543a5y";
    const DOGE_fee = +692913;
    const DOGE_token_address = "thorpub1addwnpepqdulm5ke3ckdkljasdv3mzc07m4076ctp4ph2dfnhnrz7aw9extt2jm442c";
    
    const BNB_contract_address = "bnb1cd5akjsefkdglscktwwd6nlsdxrd78fgzewp0m";
    const BNB_fee = +11250;
    const BNB_token_address = "thorpub1addwnpepqdulm5ke3ckdkljasdv3mzc07m4076ctp4ph2dfnhnrz7aw9extt2jm442c";
    
    const [chain, setChain] = useState("BCH");
    const [chains, setChains] = useState("BCH")
    const Deposit_First = async() => {
        if(phrase) {
            if(chain === "BTC") {
                const network = Network.Testnet;
                const client = new bitcoinClient({network, phrase});
                const memo = `+:${AssetBTC.chain}.${AssetBTC.symbol}:${BTC_token_address}`;
                const txID = await client.transfer({
                    asset: AssetBTC, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount,8)), //converts 
                    recipient: BTC_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetBTC.chain}.${AssetBTC.symbol}:${symDepositAddress}`
                    feeRate: BTC_fee, //can be gotten from inbound addresses
                });
            } else if(chain === "BCH") {
                const network = Network.Testnet;
                const client = new bitcoinCashClient({network, phrase});
                const memo = `+:${AssetBCH.chain}.${AssetBCH.symbol}:${BCH_token_address}`;
                const txID = await client.transfer({
                    asset: AssetBCH, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, BCH_DECIMAL)), //converts 
                    recipient: BCH_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetBCH.chain}.${AssetBCH.symbol}:${symDepositAddress}`
                    feeRate: BCH_fee, //can be gotten from inbound addresses
                });
            } else if(chain === "LTC") {    
                const network = Network.Testnet;
                const client = new litecoinClient({network, phrase});
                const memo = `+:${AssetLTC.chain}.${AssetLTC.symbol}:${LTC_token_address}`;
                const txID = await client.transfer({
                    asset: AssetLTC, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, LTC_DECIMAL)), //converts 
                    recipient: LTC_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetLTC.chain}.${AssetLTC.symbol}:${symDepositAddress}`
                    feeRate: LTC_fee, //can be gotten from inbound addresses
                });
            } else if(chain === "BNB") {
                const network = Network.Testnet;
                const client = new binanceClient({network, phrase});
                const memo = `+:${AssetBNB.chain}.${AssetBNB.symbol}:${BNB_token_address}`;
                const txID = await client.transfer({
                    asset: AssetBNB, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, ETH_DECIMAL)), //converts 
                    recipient: BNB_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetBNB.chain}.${AssetBNB.symbol}:${symDepositAddress}`
                    feeRate: BNB_fee, //can be gotten from inbound addresses
                });
            } else if(chain === "DOGE") {
                const network = Network.Testnet;
                const client = new dogeClient({network, phrase});
                const memo = `+:${AssetDOGE.chain}.${AssetDOGE.symbol}:${DOGE_token_address}`;
                const txID = await client.transfer({
                    asset: AssetDOGE, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, DOGE_DECIMAL)), //converts 
                    recipient: DOGE_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetDOGE.chain}.${AssetDOGE.symbol}:${symDepositAddress}`
                    feeRate: DOGE_fee, //can be gotten from inbound addresses
                });
            } else if(chain === "ETH") {
                const network = Network.Testnet;
                const client = new ethereumClient({network, phrase});
                const memo = `+:${AssetETH.chain}.${AssetETH.symbol}:${ETH_token_address}`;
                const txID = await client.transfer({
                    asset: AssetETH, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, ETH_DECIMAL)), //converts 
                    recipient: ETH_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetETH.chain}.${AssetETH.symbol}:${symDepositAddress}`
                    feeRate: ETH_fee, //can be gotten from inbound addresses
                });
            } 
        } else{
            alert("Plz connect wallet!")
        } 
    }

    const Withdraw_First = async() => {
        if(phrase) {
            if(chains === "BTC") {
                const network = Network.Testnet;
                const client = new bitcoinClient({network, phrase});
                const memo = `-:${AssetBTC.chain}.${AssetBTC.symbol}:${10000}`;
                const txID = await client.transfer({
                    asset: AssetBTC, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount,8)), //converts 
                    recipient: BTC_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetBTC.chain}.${AssetBTC.symbol}:${symDepositAddress}`
                    feeRate: BTC_fee, //can be gotten from inbound addresses
                });
            } else if(chains === "BCH") {
                const network = Network.Testnet;
                const client = new bitcoinCashClient({network, phrase});
                const memo = `-:${AssetBCH.chain}.${AssetBCH.symbol}:${10000}`;
                const txID = await client.transfer({
                    asset: AssetBCH, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, BCH_DECIMAL)), //converts 
                    recipient: BCH_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetBCH.chain}.${AssetBCH.symbol}:${symDepositAddress}`
                    feeRate: BCH_fee, //can be gotten from inbound addresses
                });
            } else if(chains === "LTC") {    
                const network = Network.Testnet;
                const client = new litecoinClient({network, phrase});
                const memo = `-:${AssetLTC.chain}.${AssetLTC.symbol}:${10000}`;
                const txID = await client.transfer({
                    asset: AssetLTC, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, LTC_DECIMAL)), //converts 
                    recipient: LTC_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetLTC.chain}.${AssetLTC.symbol}:${symDepositAddress}`
                    feeRate: LTC_fee, //can be gotten from inbound addresses
                });
            } else if(chains === "BNB") {
                const network = Network.Testnet;
                const client = new binanceClient({network, phrase});
                const memo = `-:${AssetBNB.chain}.${AssetBNB.symbol}:${10000}`;
                const txID = await client.transfer({
                    asset: AssetBNB, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, ETH_DECIMAL)), //converts 
                    recipient: BNB_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetBNB.chain}.${AssetBNB.symbol}:${symDepositAddress}`
                    feeRate: BNB_fee, //can be gotten from inbound addresses
                });
            } else if(chains === "DOGE") {
                const network = Network.Testnet;
                const client = new dogeClient({network, phrase});
                const memo = `-:${AssetDOGE.chain}.${AssetDOGE.symbol}:${10000}`;
                const txID = await client.transfer({
                    asset: AssetDOGE, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, DOGE_DECIMAL)), //converts 
                    recipient: DOGE_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetDOGE.chain}.${AssetDOGE.symbol}:${symDepositAddress}`
                    feeRate: DOGE_fee, //can be gotten from inbound addresses
                });
            } else if(chains === "ETH") {
                const network = Network.Testnet;
                const client = new ethereumClient({network, phrase});
                const memo = `-:${AssetETH.chain}.${AssetETH.symbol}:${10000}`;
                const txID = await client.transfer({
                    asset: AssetETH, //type asset from xchain-utils asset type
                    amount: assetToBase(assetAmount(fAmount, ETH_DECIMAL)), //converts 
                    recipient: ETH_contract_address, //inbound addresses to the asgard vault
                    memo, // `+:${AssetETH.chain}.${AssetETH.symbol}:${symDepositAddress}`
                    feeRate: ETH_fee, //can be gotten from inbound addresses
                });
            } 
        } else{
            alert("Plz connect wallet!")
        } 
    }


    // const Deposit_Rune = async() => {
        // const network = 'testnet' === 'testnet'? Network.Testnet : Network.Mainnet;
        // const chainIds = {[Network.Mainnet]: 'thorchain-mainnet-v1', [Network.Stagenet]: 'thorchain-stagenet-v1', [Network.Testnet]: 'thorchain-testnet-v2'}
        // const client = new thorchainClient({ network, phrase, chainIds });
        // const memo =  `+:${assetRUNE.chain}.${assetRUNE.symbol}:${symDepositAddress}`;
        // const txID = await client.deposit({
        // amount: inputAmount, //BaseAmount
        // memo, 
        // });
    // }

    return (
        <>
            <Box id="content" className={classes.Content}>
                <Box className="content-box">
                    <Grid container className="token-type">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>BCH</Button>
                        <Button>BCH + RUNE </Button>
                        <Button>RUNE</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid container className="token">
                        <Grid item xs={10} xl={10}>
                            <Grid>{`ADD $${fAmount}`}</Grid>
                            <Grid container>
                                <Grid item xs={9} xl={9}>
                                    <input type="number" className="amount-input"></input>
                                </Grid>
                                <Grid item xs={3} xl={3}>
                                    <Button variant="outlined">MAX</Button> 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} xl={2} className="asset">BUSD</Grid>
                    </Grid>
                    <Grid container className="token">
                        <Grid item xs={10} xl={10}>
                            <Grid>{`ADD $${fAmount}`}</Grid>
                            <Grid container>
                                <Grid item xs={9} xl={9}>
                                    <input type="number" className="amount-input"></input>
                                </Grid>
                                <Grid item xs={3} xl={3}>
                                    <Button variant="outlined">MAX</Button> 
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} xl={2} className="asset">RUNE</Grid>
                    </Grid>
                    <Grid container className="action">
                        <Button className="actionBtn" variant="outlined">ADD LIQUIDITY</Button>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Content;
