import React, { useState, useEffect } from "react";

import { Network } from "@xchainjs/xchain-client";
import { useSelector } from "react-redux";
import { Client as bitcoinCashClient } from "@xchainjs/xchain-bitcoincash";
import { Client as bitcoinClient } from "@xchainjs/xchain-bitcoincash";
import { Client as binanceClient } from "@xchainjs/xchain-binance";
import { Client as ethereumClient } from "@xchainjs/xchain-ethereum";
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
} from "../assets/constants/deposit";
import {
    withdraw_bch,
    withdraw_bnb,
    withdraw_btc,
    withdraw_ltc,
    withdraw_eth,
    withdraw_rune,
} from "../assets/constants/withdraw";
import { getPoolInfo } from "../assets/constants/poolinfo";
import axios from "axios";

const Content = () => {
    const classes = useStyles();
    const [fAmount, setFAmount] = useState();
    const [sAmount, setSAmount] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [chain, setChain] = useState("BNB");
    const [multichain, setMultichain] = useState("BNBLUNE");
    const [choose, setChoose] = useState(1);
    const [BCHList, setBCHList] = useState([]);
    const [BNBList, setBNBList] = useState([]);
    const [BTCList, setBTCList] = useState([]);
    const [RUNEList, setRUNEList] = useState([]);
    const [ETHList, setETHList] = useState([]);
    const [pagetype, setpagetype] = useState("deposit");

    const phrase = useSelector((store) => store.provider.phrase);
    let network_val = useSelector((store) => store.provider.network);

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
        }
    }, [phrase, network_val]);

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
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "BCHRUNE") {
                    deposit_bch(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "BNBRUNE") {
                    deposit_bnb(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "LTCRUNE") {
                    deposit_ltc(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "ETHRUNE") {
                    deposit_eth(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "BUSDRUNE") {
                    deposit_busd(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "USDTRUNE") {
                    deposit_usdt(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                }
            } else {
                deposit_rune(phrase, sAmount, network, chain);
            }
        } else {
            alert("Plz connect wallet!");
        }
    };

    const Withdraw = async (val, pool, ramount, amount) => {
        if (ramount < amount) {
            alert("blance is enough");
            return;
        } else {
            console.log(ramount, amount, "amount");
            if (phrase) {
                console.log(pool, "pool");
                if (val === "BTC") {
                    withdraw_btc(phrase, pool, amount);
                } else if (val === "BCH") {
                    withdraw_bch(phrase, pool, amount);
                } else if (val === "LTC") {
                    withdraw_ltc(phrase, pool, amount);
                } else if (val === "BNB") {
                    withdraw_bnb(phrase, pool, amount);
                } else if (val === "ETH") {
                    withdraw_eth(phrase, pool, amount);
                } else if (val === "RUNE") {
                    withdraw_rune(phrase, pool, amount);
                } else if (val === "BTCRUNE") {
                    withdraw_btc(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                } else if (val === "BCHRUNE") {
                    withdraw_bch(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                } else if (val === "BNBRUNE") {
                    withdraw_bnb(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                } else if (val === "LTCRUNE") {
                    withdraw_ltc(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
                } else if (val === "ETHRUNE") {
                    withdraw_eth(phrase, pool, amount);
                    withdraw_rune(phrase, pool, amount);
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
