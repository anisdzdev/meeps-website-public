import React, {useState, useCallback, useEffect} from 'react';
import {useEthers} from "@usedapp/core";
import {Card, Col, Container, Row} from "reactstrap";
import {useMint} from "../../utils/useMint";
import {ToastContainer, toast} from "react-toastify";
import {Contract, ethers, utils} from "ethers";
import "react-toastify/dist/ReactToastify.css";
import {useIsWLSale} from "../../utils/getIsWLSale";
import {useWhitelistMint} from "../../utils/useWhitelistMint";
import getWhitelistProof from "../../utils/getWhitelistProof";
import {Config} from "../../utils/config";
import {abi} from "../../utils/getContractAbi";


function MintBox({isWhitelistSaleActive}) {
    const {activateBrowserWallet, account, library} = useEthers();
    const {state: mintState, send: mint} = useMint();
    const {state: wlMintState, send: wlMint} = useWhitelistMint();

    const isWLSaleActive = useIsWLSale();

    const [maxQuantity, setMaxQuantity] = useState(2);
    const [supply, setSupply] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleAdd = useCallback(() => {
        if (quantity >= 0 && quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    }, [quantity, maxQuantity]);

    const handleSubtract = useCallback(() => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }, [quantity]);

    const handleConnect = useCallback(() => {
        if (!account) {
            activateBrowserWallet()
                .catch(() => toast(" 🦊 MetaMask Wallet not connected!"));
        }
    }, [activateBrowserWallet, account]);

    const handleMint = useCallback(async () => {
        if (account) {
            if (isWLSaleActive) {
                const proof = await getWhitelistProof(library, account);
                if (proof === 0) return toast(" 🦊 You are not whitelisted!");
                wlMint(quantity, proof.proof)
            } else {
                mint(quantity);
            }
        } else {
            toast("Oops Try Again!");
        }
    }, [quantity, account, mint]);

    useEffect(() => {
        toast(mintState.errorMessage);
        if (mintState.status === 'Success') {
            toast("Successfully minted " + quantity + " Meeps")
        }
    }, [mintState])

    useEffect(() => {
        toast(wlMintState.errorMessage);
        if (wlMintState.status === 'Success') {
            toast("Successfully minted " + quantity + " Meeps")
        }
    }, [wlMintState])

    useEffect(async () => {
        if (isWhitelistSaleActive && account !== null && library !== null) {
            const proof = await getWhitelistProof(library, account);
            if (proof === 0) return toast(" 🦊 You are not whitelisted!");
            if (proof.level === 1) {
                toast("You are eligible for 1 mint");
                return setMaxQuantity(1);
            }
            if (proof.level === 2) {
                toast("You are eligible for 2 mints");
                return setMaxQuantity(2);
            }
        }
    }, [account, library, setMaxQuantity])

    useEffect(() => {
        const supplyCheck = async () => {
            const meeps = new Contract(Config.contractAddress, abi, library.getSigner())
            const supply = await meeps.totalSupply();
            setSupply(supply);
        }
        setInterval(() => {
            supplyCheck();
        }, 5000);
        supplyCheck();
    }, [])

    return (
        <Container style={{maxWidth: '800px'}}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Card className="mint-card">
                <Row className="mint-box-row">
                    <Col md={12} style={{display: 'flex', flexWrap: 'wrap'}}>
                        <div className="mint-supply-content">{String(supply).padStart(4, '0')} / 5555</div>
                        <div className="mint-amount-content">QTY: {quantity}</div>
                        <div className="mint-amount-btn noselect" onClick={handleSubtract}>-</div>
                        <div className="mint-amount-btn mint-amount-btn-plus noselect" onClick={handleAdd}>+</div>
                    </Col>
                </Row>
                <Row>
                    {account ?
                        <button className="header-mint-now-btn mint-popup-button" onClick={handleMint}>MINT NOW</button>
                        : <button className="header-mint-now-btn mint-popup-button" onClick={handleConnect}>CONNECT
                            WALLET</button>}
                </Row>
            </Card>
        </Container>
    )
}

export default MintBox;