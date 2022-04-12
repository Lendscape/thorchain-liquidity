import React, { useState, useEffect } from "react";
// ** Web3 React


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
