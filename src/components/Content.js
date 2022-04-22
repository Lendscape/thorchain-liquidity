import React, { useState, useEffect } from "react";

import { Network } from "@xchainjs/xchain-client";
import { useSelector } from "react-redux";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
// Import Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import { Assets } from "../assets/constants/wallets";
import useStyles from "../assets/constants/styles";
import {
    deposit_bch,
    deposit_bnb,
    deposit_btc,
    deposit_ltc,
    deposit_eth,
    deposit_rune,
    deposit_busd,
    deposit_usdt,
    deposit_Binance_xdefi,
    deposit_ThorBased_xdefi,
    deposit_BitcoinBased_xdefi,
} from "../assets/constants/deposit";
import {
    withdraw_bch,
    withdraw_bnb,
    withdraw_btc,
    withdraw_ltc,
    withdraw_eth,
    withdraw_rune,
    withdraw_Binance_xdefi,
    withdraw_BitcoinBased_xdefi,
    withdraw_ThorBased_xdefi,
} from "../assets/constants/withdraw";
import {
    getPooldata_testnet,
    getPooldata_chaosnet,
    getPooldata_stagenet,
} from "../assets/constants/poolinfo";
import axios from "axios";

const Content = () => {
    const classes = useStyles();
    const [fAmount, setFAmount] = useState();
    const [sAmount, setSAmount] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [chain, setChain] = useState("BNB");
    const [multichain, setMultichain] = useState("BNBLUNE");
    const [choose, setChoose] = useState(1);
    const [RUNEList, setRUNEList] = useState([]);
    const [pagetype, setpagetype] = useState("deposit");
    const [poolInfo, setPoolInfo] = useState({});

    const phrase = useSelector((store) => store.provider.phrase);
    const bnb_address_xfi = useSelector((store) => store.provider.bnbaddress);
    const bch_address_xfi = useSelector((store) => store.provider.bchaddress);
    const btc_address_xfi = useSelector((store) => store.provider.btcaddress);
    const thor_address_xfi = useSelector((store) => store.provider.thoraddress);
    let network_val = useSelector((store) => store.provider.network);
    const xfiObject = window.xfi;

    const pooldata = async (network) => {
        if (network === 1) {
            const pooldata = await getPooldata_testnet();
            console.log(chain, "pooldata");
            for (let i = 0; i < pooldata.length; i++) {
                if (pooldata[i].asset.split(".")[1] === chain) {
                    console.log(pooldata[i], "s1");
                    setPoolInfo(pooldata[i]);
                }
                if (chain === "BUSD") {
                    if (pooldata[i].asset.split(".")[1] === "BUSD-74E") {
                        setPoolInfo(pooldata[i]);
                        console.log(pooldata[i], "s2");
                    }
                }
                if (chain === "USDT") {
                    if (
                        pooldata[i].asset.split(".")[1] ===
                        "USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"
                    ) {
                        setPoolInfo(pooldata[i]);
                        console.log(pooldata[i], "s");
                    }
                }
            }
        } else if (network === 2) {
            const pooldata = await getPooldata_chaosnet();
            for (let i = 0; i < pooldata.length; i++) {
                if (pooldata[i].asset.split(".")[1] === chain) {
                    setPoolInfo(pooldata[i]);
                }
                if (chain === "BUSD") {
                    if (pooldata[i].asset.split(".")[1] === "BUSD-BD1") {
                        setPoolInfo(pooldata[i]);
                    }
                }
                if (chain === "USDT") {
                    if (
                        pooldata[i].asset.split(".")[1] ===
                        "USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7"
                    ) {
                        setPoolInfo(pooldata[i]);
                    }
                }
            }
        } else {
            const pooldata = await getPooldata_stagenet();
            for (let i = 0; i < pooldata.length; i++) {
                if (pooldata[i].asset.split(".")[1] === chain) {
                    setPoolInfo(pooldata[i]);
                }
                if (chain === "BUSD") {
                    if (pooldata[i].asset.split(".")[1] === "BUSD-74E") {
                        setPoolInfo(pooldata[i]);
                    }
                }
                if (chain === "USDT") {
                    if (
                        pooldata[i].asset.split(".")[1] ===
                        "USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7"
                    ) {
                        setPoolInfo(pooldata[i]);
                    }
                }
            }
        }
    };

    const nFormatter = (num) => {
        if (num >= 1000000000) {
            const number = (num / 1000000000).toFixed(2);
            return `${number}G`;
        }
        if (num >= 1000000) {
            const number = (num / 1000000).toFixed(2);
            return `${number}M`;
        }
        if (num >= 1000) {
            const number = (num / 1000).toFixed(2);
            return `${number}K`;
        }
        return num;
    };

    useEffect(() => {
        const network = network_val ? network_val : 1;
        console.log(network, "network");
        pooldata(network);
    }, [network_val, chain]);

    const onItemClick = (item) => {
        setChain(item.title);
        setIsOpen(false);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const getDateformat = (val) => {
        const timestamp = Number(val) * 1000;
        const y = new Date(timestamp).getFullYear();
        const m = new Date(timestamp).getMonth();
        const d = new Date(timestamp).getDate();
        return `${y}-${m}-${d}`;
    };

    const onChangeFirst = (value) => {
        setFAmount(value);
        if (choose === 2) {
            if (chain === "BNB") {
                setSAmount(2553.09 * value);
            } else if (chain === "BTC") {
                setSAmount(310011 * value);
            } else if (chain === "ETH") {
                setSAmount(1027.16 * value);
            } else if (chain === "BUSD") {
                setSAmount(0.211664 * value);
            } else if (chain === "USDT") {
                setSAmount(594.631 * value);
            } else if (chain === "BCH") {
                setSAmount(7227.86 * value);
            }
        }
    };

    const onChangeSecond = (value) => {
        console.log(value, "value");
        setSAmount(value);
        if (choose === 2) {
            if (chain === "BNB") {
                setFAmount(0.000391624 * value);
            } else if (chain === "BTC") {
                setFAmount(0.00000322568 * value);
            } else if (chain === "ETH") {
                setFAmount(0.000973448 * value);
            } else if (chain === "BUSD") {
                setFAmount(4.72446 * value);
            } else if (chain === "USDT") {
                setFAmount(0.00168171 * value);
            } else if (chain === "BCH") {
                setFAmount(0.000138352 * value);
            }
        }
    };

    useEffect(async () => {
        if (phrase) {
            network_val = network_val ? network_val : 1;
            const network =
                network_val === 1
                    ? Network.Testnet
                    : network_val === 2
                    ? Network.Mainnet
                    : Network.Stagenet;

            const chainIds = {
                [Network.Mainnet]: "thorchain-mainnet-v1",
                [Network.Stagenet]: "thorchain-stagenet-v1",
                [Network.Testnet]: "thorchain-testnet-v2",
            };
            const RUNE_client = new thorchainClient({
                network,
                phrase,
                chainIds,
            });
            const RUNE_address = RUNE_client.getAddress();
            try {
                const RUNE_list = await axios.get(
                    `https://testnet.midgard.thorchain.info/v2/member/${RUNE_address}`
                );
                if (RUNE_list.data) {
                    console.log(RUNE_list.data.pools, "runelist");
                    setRUNEList(RUNE_list.data.pools);
                }
            } catch (e) {
                console.log(e);
            }
        } else if (window.xfi && thor_address_xfi) {
            console.log("xficonnect");
            try {
                const RUNE_list = await axios.get(
                    `https://testnet.midgard.thorchain.info/v2/member/${thor_address_xfi}`
                );
                if (RUNE_list.data) {
                    console.log(RUNE_list.data.pools, "runelist");
                    setRUNEList(RUNE_list.data.pools);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [phrase, network_val, thor_address_xfi]);

    const Deposit = async () => {
        network_val = network_val ? network_val : 1;
        if (phrase) {
            const network =
                network_val === 1
                    ? Network.Testnet
                    : network_val === 2
                    ? Network.Mainnet
                    : Network.Stagenet;
            console.log(network, "network");
            if (choose === 1) {
                if (chain === "BTC") {
                    deposit_btc(phrase, fAmount, network);
                } else if (chain === "BCH") {
                    deposit_bch(phrase, fAmount, network);
                } else if (chain === "LTC") {
                    deposit_ltc(phrase, fAmount, network);
                } else if (chain === "BNB") {
                    deposit_bnb(phrase, fAmount, network);
                } else if (chain === "ETH") {
                    deposit_eth(phrase, fAmount, network);
                } else if (chain === "BUSD") {
                    deposit_busd(phrase, fAmount, network);
                } else if (chain === "USDT") {
                    deposit_usdt(fAmount);
                }
            } else if (choose === 2) {
                if (multichain === "BTCRUNE") {
                    deposit_btc(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network, chain);
                } else if (multichain === "BCHRUNE") {
                    deposit_bch(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network, chain);
                } else if (multichain === "BNBRUNE") {
                    deposit_bnb(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network, chain);
                } else if (multichain === "LTCRUNE") {
                    deposit_ltc(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network, chain);
                } else if (multichain === "ETHRUNE") {
                    deposit_eth(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network, chain);
                } else if (multichain === "BUSDRUNE") {
                    deposit_busd(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network, chain);
                } else if (multichain === "USDTRUNE") {
                    deposit_usdt(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network, chain);
                }
            } else {
                deposit_rune(phrase, sAmount, network, chain);
            }
        } else if (window.xfi) {
            if (choose === 1) {
                if (chain === "BNB") {
                    deposit_Binance_xdefi(
                        xfiObject.binance,
                        bnb_address_xfi,
                        fAmount,
                        "BNB"
                    );
                } else if (chain === "BUSD") {
                    deposit_Binance_xdefi(
                        xfiObject.binance,
                        bnb_address_xfi,
                        fAmount,
                        "BUSD"
                    );
                } else if (chain === "BCH") {
                    deposit_BitcoinBased_xdefi(
                        xfiObject.bitcoincash,
                        bch_address_xfi,
                        fAmount,
                        "BCH"
                    );
                } else if (chain === "BTC") {
                    deposit_BitcoinBased_xdefi(
                        xfiObject.bitcoin,
                        btc_address_xfi,
                        fAmount,
                        "BTC"
                    );
                }
            } else if (choose === 2) {
                if (multichain === "BTCRUNE") {
                    deposit_BitcoinBased_xdefi(
                        xfiObject.bitcoin,
                        btc_address_xfi,
                        fAmount,
                        "BTC"
                    );
                    deposit_ThorBased_xdefi(
                        xfiObject.thorchain,
                        thor_address_xfi,
                        sAmount,
                        chain
                    );
                } else if (multichain === "BCHRUNE") {
                    deposit_BitcoinBased_xdefi(
                        xfiObject.bitcoincash,
                        bch_address_xfi,
                        fAmount,
                        "BCH"
                    );
                    deposit_ThorBased_xdefi(
                        xfiObject.thorchain,
                        thor_address_xfi,
                        sAmount,
                        chain
                    );
                } else if (multichain === "BNBRUNE") {
                    deposit_Binance_xdefi(
                        xfiObject.binance,
                        bnb_address_xfi,
                        fAmount
                    );
                    deposit_ThorBased_xdefi(
                        xfiObject.thorchain,
                        thor_address_xfi,
                        sAmount,
                        chain
                    );
                }
            } else {
                console.log(chain, "chain");
                deposit_ThorBased_xdefi(
                    xfiObject.thorchain,
                    thor_address_xfi,
                    sAmount,
                    chain
                );
            }
        } else {
            alert("Plz connect wallet!");
        }
    };

    const Withdraw = async (chain, pool, ramount, amount) => {
        console.log(chain, pool, ramount, amount, "detail");
        if (ramount < amount) {
            alert("blance is enough");
            return;
        } else {
            if (phrase) {
                console.log(pool, "pool");
                if (chain === "BTC") {
                    withdraw_btc(phrase, pool, amount);
                } else if (chain === "BCH") {
                    withdraw_bch(phrase, pool, amount);
                } else if (chain === "LTC") {
                    withdraw_ltc(phrase, pool, amount);
                } else if (chain === "BNB") {
                    withdraw_bnb(phrase, pool, amount);
                } else if (chain === "ETH") {
                    withdraw_eth(phrase, pool, amount);
                } else if (chain === "RUNE") {
                    withdraw_rune(phrase, pool, amount);
                } else if (chain === "BTCRUNE") {
                    withdraw_btc(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                } else if (chain === "BCHRUNE") {
                    withdraw_bch(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                } else if (chain === "BNBRUNE") {
                    withdraw_bnb(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                } else if (chain === "LTCRUNE") {
                    withdraw_ltc(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                } else if (chain === "ETHRUNE") {
                    withdraw_eth(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                }
            } else if (window.xfi && thor_address_xfi) {
                if (chain === "BNB") {
                    withdraw_Binance_xdefi(
                        xfiObject.binance,
                        bnb_address_xfi,
                        amount,
                        "BNB"
                    );
                } else if (chain === "BUSD") {
                    withdraw_Binance_xdefi(
                        xfiObject.binance,
                        bnb_address_xfi,
                        amount,
                        "BUSD"
                    );
                } else if (chain === "BCH") {
                    withdraw_BitcoinBased_xdefi(
                        xfiObject.bitcoincash,
                        bch_address_xfi,
                        amount,
                        "BCH"
                    );
                } else if (chain === "BTC") {
                    withdraw_BitcoinBased_xdefi(
                        xfiObject.bitcoin,
                        btc_address_xfi,
                        amount,
                        "BTC"
                    );
                } else if (chain === "RUNE") {
                    withdraw_ThorBased_xdefi(
                        xfiObject.thorchain,
                        thor_address_xfi,
                        amount,
                        pool
                    );
                }
            } else {
                alert("Plz connect wallet!");
            }
        }
    };

    return (
        <>
            {pagetype === "deposit" ? (
                <Box id="content" className={classes.Content}>
                    <Box className="content-box">
                        <Grid container className="content-header">
                            <Button
                                variant="outlined"
                                onClick={() => setpagetype("deposit")}
                            >
                                DEPOSIT
                            </Button>
                            <Button onClick={() => setpagetype("withdraw")}>
                                WITHDRAW
                            </Button>
                        </Grid>
                        <Grid container className="token-type">
                            {choose === 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setIsOpen(true);
                                    }}
                                >
                                    {chain}
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setIsOpen(true);
                                        setChoose(1);
                                    }}
                                >
                                    {chain}
                                </Button>
                            )}
                            {choose === 2 ? (
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        setMultichain(`${chain}RUNE`)
                                    }
                                >{`${chain} + RUNE`}</Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setMultichain(`${chain}RUNE`);
                                        setChoose(2);
                                    }}
                                >{`${chain} + RUNE`}</Button>
                            )}
                            {choose === 3 ? (
                                <Button
                                    variant="contained"
                                    onClick={() => setChoose(3)}
                                >
                                    RUNE
                                </Button>
                            ) : (
                                <Button onClick={() => setChoose(3)}>
                                    RUNE
                                </Button>
                            )}
                        </Grid>
                        <Grid container className="token">
                            <Grid item xs={10} xl={10}>
                                <Grid>{`ADD ${fAmount ? fAmount : 0}`}</Grid>
                                <Grid container>
                                    <Grid item xs={9} xl={9}>
                                        <input
                                            type="number"
                                            value={fAmount ? fAmount : ""}
                                            onChange={(e) =>
                                                onChangeFirst(e.target.value)
                                            }
                                            className="amount-input"
                                        ></input>
                                    </Grid>
                                    <Grid item xs={3} xl={3}>
                                        <Button variant="outlined">MAX</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} xl={2} className="asset">
                                {chain}
                            </Grid>
                        </Grid>
                        <Grid container className="token">
                            <Grid item xs={10} xl={10}>
                                <Grid>{`ADD ${sAmount ? sAmount : 0}`}</Grid>
                                <Grid container>
                                    <Grid item xs={9} xl={9}>
                                        <input
                                            type="number"
                                            value={sAmount ? sAmount : ""}
                                            onChange={(e) =>
                                                onChangeSecond(e.target.value)
                                            }
                                            className="amount-input"
                                        ></input>
                                    </Grid>
                                    <Grid item xs={3} xl={3}>
                                        <Button variant="outlined">MAX</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} xl={2} className="asset">
                                RUNE
                            </Grid>
                        </Grid>
                        {poolInfo ? (
                            <Grid container style={{ marginTop: "20px" }}>
                                <Grid item xs={6} xl={6}>
                                    USD PRICE :
                                </Grid>
                                <Grid item xs={6} xl={6}>
                                    {nFormatter(Number(poolInfo.assetPriceUSD))}
                                </Grid>
                                <Grid item xs={6} xl={6}>
                                    LIQUIDITY :
                                </Grid>
                                <Grid item xs={6} xl={6}>
                                    {nFormatter(
                                        Number(poolInfo.assetAdded) +
                                            Number(poolInfo.runeAdded)
                                    )}
                                </Grid>
                                <Grid item xs={6} xl={6}>
                                    24H VOLUME :
                                </Grid>
                                <Grid item xs={6} xl={6}>
                                    {nFormatter(Number(poolInfo.volume24h))}
                                </Grid>
                                <Grid item xs={6} xl={6}>
                                    APY :
                                </Grid>
                                <Grid item xs={6} xl={6}>
                                    {nFormatter(Number(poolInfo.poolAPY))}
                                </Grid>
                            </Grid>
                        ) : (
                            ""
                        )}
                        <Grid container className="action">
                            <Button
                                className="actionBtn"
                                variant="outlined"
                                onClick={() => Deposit()}
                            >
                                ADD LIQUIDITY
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            ) : (
                <Box id="content" className={classes.Content}>
                    <Box
                        className="content-box"
                        style={{ overflowY: "scroll" }}
                    >
                        <Grid container className="content-header">
                            <Button onClick={() => setpagetype("deposit")}>
                                DEPOSIT
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setpagetype("withdraw")}
                            >
                                WITHDRAW
                            </Button>
                        </Grid>
                        {RUNEList && RUNEList.length > 0 ? (
                            <Grid>
                                {RUNEList.map((item, index) => (
                                    <Grid
                                        container
                                        key={index}
                                        display="flex"
                                        justifyContent={"space-around"}
                                    >
                                        <Grid item xs={12} xl={12}>
                                            - {item.pool.split(".")[0]}
                                        </Grid>
                                        {Number(item.assetAdded) !== 0 ? (
                                            <Grid container>
                                                <Grid item xs={12} xl={12}>
                                                    {item.pool.split(".")[1]} LP
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    xl={12}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Grid item xs={6} xl={6}>
                                                        {
                                                            item.pool.split(
                                                                "."
                                                            )[1]
                                                        }{" "}
                                                        Share:
                                                    </Grid>
                                                    <Grid item xs={6} xl={6}>
                                                        {item.assetAdded /
                                                            10 ** 8}
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    xl={12}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Grid item xs={6} xl={6}>
                                                        Lp units:
                                                    </Grid>
                                                    <Grid item xs={6} xl={6}>
                                                        {item.liquidityUnits /
                                                            10 ** 8}
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    xl={12}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Grid item xs={6} xl={6}>
                                                        Last Added:
                                                    </Grid>
                                                    <Grid item xs={6} xl={6}>
                                                        {getDateformat(
                                                            item.dateLastAdded
                                                        )}
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    xl={12}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Grid item xs={6} xl={6}>
                                                        <input
                                                            type="number"
                                                            id="assetAmount"
                                                            placeholder="withdraw amount"
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        ></input>
                                                    </Grid>
                                                    <Grid item xs={6} xl={6}>
                                                        <Button
                                                            onClick={() =>
                                                                Withdraw(
                                                                    item.pool.split(
                                                                        "."
                                                                    )[1],
                                                                    item.pool,
                                                                    Number(
                                                                        item[
                                                                            "assetAdded"
                                                                        ]
                                                                    ) /
                                                                        10 ** 8,
                                                                    Number(
                                                                        document.getElementById(
                                                                            "assetAdded"
                                                                        ).value
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            Withdraw
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            ""
                                        )}

                                        {Number(item.runeAdded) !== 0 ? (
                                            <Grid container>
                                                <Grid item xs={12} xl={12}>
                                                    RUNE LP
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    xl={12}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Grid item xs={6} xl={6}>
                                                        RUNE Share:
                                                    </Grid>
                                                    <Grid item xs={6} xl={6}>
                                                        {item.runeAdded /
                                                            10 ** 8}
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    xl={12}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Grid item xs={6} xl={6}>
                                                        Lp units:
                                                    </Grid>
                                                    <Grid item xs={6} xl={6}>
                                                        {item.liquidityUnits /
                                                            10 ** 8}
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    xl={12}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Grid item xs={6} xl={6}>
                                                        Last Added:
                                                    </Grid>
                                                    <Grid item xs={6} xl={6}>
                                                        {getDateformat(
                                                            item.dateLastAdded
                                                        )}
                                                    </Grid>
                                                </Grid>

                                                <Grid
                                                    item
                                                    xs={12}
                                                    xl={12}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Grid item xs={6} xl={6}>
                                                        <input
                                                            type="number"
                                                            id="runeAmount"
                                                            placeholder="withdraw amount"
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        ></input>
                                                    </Grid>
                                                    <Grid item xs={6} xl={6}>
                                                        <Button
                                                            onClick={() =>
                                                                Withdraw(
                                                                    "RUNE",
                                                                    item.pool,
                                                                    Number(
                                                                        item[
                                                                            "runeAdded"
                                                                        ]
                                                                    ) /
                                                                        10 ** 8,
                                                                    Number(
                                                                        document.getElementById(
                                                                            "runeAmount"
                                                                        ).value
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            Withdraw
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            ""
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            ""
                        )}
                    </Box>
                </Box>
            )}
            <Dialog
                onClose={handleClose}
                open={isOpen}
                maxWidth="xs"
                className={classes.cWallet}
                classes={{
                    paper: "cwallet-paper",
                }}
            >
                <Box className="title">
                    <DialogTitle color="black">SELECT ASSET</DialogTitle>
                    <IconButton
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogContent className="content">
                    <List>
                        {Assets.map((item, index) => (
                            <ListItem
                                key={index}
                                onClick={() => onItemClick(item)}
                                className="item activating-item"
                            >
                                <ListItemIcon className="symbol">
                                    <img
                                        src={item ? item.logo : ""}
                                        alt={item ? item.logo : ""}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    className="activating-description"
                                    primary={item ? item.title : ""}
                                    secondary={item ? item.network : ""}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Content;
