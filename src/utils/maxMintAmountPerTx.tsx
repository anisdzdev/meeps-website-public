import {useCall} from '@usedapp/core';
import {Config} from './config';
import {useContractAbi} from './getContractAbi';
import {Contract} from 'ethers';

export const useMaxMintAmountPerTx = (): Number | undefined => {
    const {value, error} = useCall(
        Config.contractAddress && {
            contract: new Contract(Config.contractAddress, useContractAbi),
            method: 'maxMintAmountPerTx', // Method to be called
            args: []
        }) ?? {}
    if (error) {
        console.error(error.message)
        return undefined
    }
    return value && Number(value[0]);
};
