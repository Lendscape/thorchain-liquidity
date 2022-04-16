import React, { useState, useEffect } from 'react'
import Cwallet from "./Cwallet";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain"
import { Network } from '@xchainjs/xchain-client';

import { useWeb3React } from "@web3-react/core";
import Button from '@mui/material/Button';
import useStyles from "../assets/constants/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Header = ({phrase,setPhrase}) => {
    const classes = useStyles();
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [thorAddress, setThorAddress] = useState('');
    // eslint-disable-next-line
    const { activate, active, account, deactivate, connector, error, setError } = useWeb3React();

    const onConnectWallet = async () => {
        setIsOpenDialog(true);
    }

    useEffect(() => {
        if(phrase) {
            const network = Network.Testnet;
            const chainIds = {[Network.Mainnet]: 'thorchain-mainnet-v1', [Network.Stagenet]: 'thorchain-stagenet-v1', [Network.Testnet]: 'thorchain-testnet-v2'}
            const client = new thorchainClient({ network, phrase, chainIds });
            setThorAddress(client.getAddress());
        }
    },[phrase])

    return (
        <header 
            className={classes.Header}
        >
            {
                phrase ?
                <>
                    <CopyToClipboard
                    text={thorAddress}
                    >
                        <Tooltip arrow title="Copy address">
                            <IconButton size="small">
                                {thorAddress.substring(0, 3)} ... {thorAddress.substring(thorAddress.length - 3)}
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </>
                    :
                    <Button variant="contained" className="button-connect" onClick={onConnectWallet}>Connect</Button>
            }
            <Cwallet isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} setPhrase={setPhrase} />
        </header>
    )
}

export default Header