declare const sharedTypes: {
    AnchorData: {
        anchoredBlock: string;
        docRoot: string;
        id: string;
    };
    PreCommitData: {
        expirationBlock: string;
        identity: string;
        signingRoot: string;
    };
    Fee: {
        key: string;
        price: string;
    };
    MultiAccountData: {
        deposit: string;
        depositor: string;
        signatories: string;
        threshold: string;
    };
    ChainId: string;
    DepositNonce: string;
    ResourceId: string;
    "chainbridge::ChainId": string;
    RegistryId: string;
    TokenId: string;
    AssetId: {
        registryId: string;
        tokenId: string;
    };
    AssetInfo: {
        metadata: string;
    };
    MintInfo: {
        anchorId: string;
        proofs: string;
        staticHashes: string;
    };
    Proof: {
        leafHash: string;
        sortedHashes: string;
    };
    ProofMint: {
        hashes: string;
        property: string;
        salt: string;
        value: string;
    };
    RegistryInfo: {
        fields: string;
        ownerCanBurn: string;
    };
};
export default sharedTypes;
//# sourceMappingURL=centrifuge-types.d.ts.map