import {useContractFunction} from '@usedapp/core';
import {useContractAbi} from './getContractAbi';
import {Contract} from 'ethers';
import {Config} from "./config";


export const useWhitelistMint = (): object => {
    const contract = new Contract(Config.contractAddress, useContractAbi)
    return useContractFunction(contract, 'whitelistMint');
};