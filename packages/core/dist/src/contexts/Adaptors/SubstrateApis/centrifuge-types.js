"use strict";
// Copyright 2017-2021 @polkadot/types-known authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var sharedTypes = {
    // Anchor
    AnchorData: {
        anchoredBlock: "u64",
        docRoot: "H256",
        id: "H256"
    },
    PreCommitData: {
        expirationBlock: "u64",
        identity: "H256",
        signingRoot: "H256"
    },
    // Fees
    Fee: {
        key: "Hash",
        price: "Balance"
    },
    // MultiAccount
    MultiAccountData: {
        deposit: "Balance",
        depositor: "AccountId",
        signatories: "Vec<AccountId>",
        threshold: "u16"
    },
    // Bridge
    ChainId: "u8",
    DepositNonce: "u64",
    ResourceId: "[u8; 32]",
    "chainbridge::ChainId": "u8",
    // NFT
    RegistryId: "H160",
    TokenId: "U256",
    AssetId: {
        registryId: "RegistryId",
        tokenId: "TokenId"
    },
    AssetInfo: {
        metadata: "Bytes"
    },
    MintInfo: {
        anchorId: "Hash",
        proofs: "Vec<ProofMint>",
        staticHashes: "[Hash; 3]"
    },
    Proof: {
        leafHash: "H256",
        sortedHashes: "H256"
    },
    ProofMint: {
        hashes: "Vec<Hash>",
        property: "Bytes",
        salt: "[u8; 32]",
        value: "Bytes"
    },
    RegistryInfo: {
        fields: "Vec<Bytes>",
        ownerCanBurn: "bool"
    }
};
var versioned = [
    {
        minmax: [240, 999],
        types: __assign(__assign({}, sharedTypes), { AccountInfo: "AccountInfoWithRefCount", Address: "LookupSource", LookupSource: "IndicesLookupSource", Multiplier: "Fixed64", RefCount: "RefCountTo259" })
    },
    {
        minmax: [1000, undefined],
        types: __assign({}, sharedTypes)
    },
];
exports["default"] = sharedTypes;
//# sourceMappingURL=centrifuge-types.js.map