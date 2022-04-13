import React, { useState, useEffect } from "react";

// Import Material UI Components
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid';
// Import Assets
import useStyles from "../assets/constants/styles";
import { deposit_bch, deposit_bnb, deposit_btc, deposit_ltc, deposit_eth, deposit_rune } from "../assets/constants/deposit";
import { withdraw_bch, withdraw_bnb, withdraw_btc, withdraw_ltc, withdraw_eth, withdraw_rune } from "../assets/constants/withdraw";
// import { Client as thorchainClient } from "@xchainjs/xchain-thorchain"

const Content = ({ phrase }) => {
    const classes = useStyles();
    const [fAmount, setFAmount] = useState(0.00001);
    
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
   
    const DOGE_contract_address = "DNxM7iBXERpr1Y4YH6bscUjyHUVd543a5y";
    const DOGE_fee = +692913;
    const DOGE_token_address = "thorpub1addwnpepqdulm5ke3ckdkljasdv3mzc07m4076ctp4ph2dfnhnrz7aw9extt2jm442c";
    
    const BNB_contract_address = "tbnb14zwl05sxa0wc0cjcxx5gnffeh2lexh0gamy9ca";
    const BNB_fee = +11250;
    const BNB_token_address = "tbnb1xxyhnpf7tl9pu909hmfx3m3mq62gcre20me4s0";

    const LUNE_contract_address = "tthor1g98cy3n9mmjrpn0sxmn63lztelera37nrytwp2";

    
    const [chain, setChain] = useState("BNB");
    const [chains, setChains] = useState("BCH")
    const Deposit = async() => {
        if(phrase) {
            if(chain === "BTC") {
                deposit_btc(phrase, fAmount)
            } else if(chain === "BCH") {
                deposit_bch( phrase,fAmount)
            } else if(chain === "LTC") {    
                deposit_ltc(phrase, fAmount)
            } else if(chain === "BNB") {
                deposit_bnb(phrase, fAmount)
            }  else if(chain === "ETH") {
                deposit_eth(phrase, fAmount) 
            } else if(chain === "RUNE") {
                deposit_rune(phrase, fAmount)
            } else if(chain === "BTCRUNE") {
                deposit_btc(phrase, fAmount)
                deposit_rune(phrase, fAmount)
            } else if(chain === "BCHRUNE") {
                deposit_bch(phrase, fAmount)
                deposit_rune(phrase, fAmount)
            } else if(chain === "BNBRUNE") {
                deposit_bnb(phrase, fAmount)
                deposit_rune(phrase, fAmount)
            } else if(chain === "LTCRUNE") {
                deposit_ltc(phrase, fAmount)
                deposit_rune(phrase, fAmount) 
            } else if(chain === "ETHRUNE") {
                deposit_eth(phrase, fAmount)
                deposit_rune(phrase, fAmount) 
            }
        } else{
            alert("Plz connect wallet!")
        } 
    }

    const Withdraw = async() => {
        if(phrase) {
            if(chains === "BTC") {
               withdraw_btc(phrase, fAmount)
            } else if(chains === "BCH") {
               withdraw_bch( phrase,fAmount)
            } else if(chains === "LTC") {    
               withdraw_ltc(phrase, fAmount)
            } else if(chains === "BNB") {
               withdraw_bnb(phrase, fAmount)
            }  else if(chains === "ETH") {
               withdraw_eth(phrase, fAmount) 
            } else if(chains === "RUNE") {
               withdraw_rune(phrase, fAmount)
            } else if(chains === "BTCRUNE") {
               withdraw_btc(phrase, fAmount)
               withdraw_rune(phrase, fAmount)
            } else if(chains === "BCHRUNE") {
               withdraw_bch(phrase, fAmount)
               withdraw_rune(phrase, fAmount)
            } else if(chains === "BNBRUNE") {
               withdraw_bnb(phrase, fAmount)
               withdraw_rune(phrase, fAmount)
            } else if(chains === "LTCRUNE") {
               withdraw_ltc(phrase, fAmount)
               withdraw_rune(phrase, fAmount) 
            } else if(chains === "ETHRUNE") {
               withdraw_eth(phrase, fAmount)
               withdraw_rune(phrase, fAmount) 
            }
        } else{
            alert("Plz connect wallet!")
        } 
    }

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
                        <Button className="actionBtn" variant="outlined" onClick={() => Deposit()}>ADD LIQUIDITY</Button>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Content;
