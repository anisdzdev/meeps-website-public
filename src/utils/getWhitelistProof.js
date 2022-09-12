import whitelist1 from './whitelist1.json';
import whitelist2 from './whitelist2.json';

import {MerkleTree} from 'merkletreejs';
import keccak256 from 'keccak256';

import {Buffer} from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

const getWhitelistProof = async (provider, address) => {
    if (whitelist1.length < 1 && whitelist2.length < 1) {
        return 0;
    }
    let proof = await lookupProof(whitelist2, provider, address);
    let level = 2;
    if (proof === 0) {
        proof = await lookupProof(whitelist1, provider, address);
        level = 1;
    }

    if (proof === 0) return 0;
    return {level, proof};
}

const lookupProof = async (list, provider, address) => {
    const regex = new RegExp(list.join("|"), "i");
    const ens = await provider.lookupAddress(address);
    let foundByEns = 0;
    if (ens != null) {
        if (regex.test(ens)) {
            foundByEns = 1;
        } else if (regex.test(address)) {
            foundByEns = 0;
        } else {
            return 0;
        }
    } else {
        if (!regex.test(address)) return 0;
    }

    // Build the Merkle Tree
    const leafNodes = list.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
    return foundByEns === 1 ? merkleTree.getHexProof(keccak256(ens)) : merkleTree.getHexProof(keccak256(address));
}

export default getWhitelistProof;