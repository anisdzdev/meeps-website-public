import {useCall} from '@usedapp/core';
import {Config} from './config';
import {useContractAbi} from './getContractAbi';
import {Contract} from 'ethers';

export const useIsWLSale = (): boolean | undefined => {
    const {value, error} = useCall(
        Config.contractAddress && {
            contract: new Contract(Config.contractAddress, useContractAbi),
            method: 'whitelistMintEnabled',
            args: []
        }) ?? {}
    if (error) {
        console.error(error.message)
        return undefined
    }
    return value && Boolean(value[0]);
};