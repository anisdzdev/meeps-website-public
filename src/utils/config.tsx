import {Config as DAppConfig, Mainnet, Rinkeby} from '@usedapp/core';

enum EnvironmentType {
    DEBUG = 'debug',
    PROD = 'prod',
}

interface FrontendConfig {
    isDebug: boolean;
    isProduction: boolean;
    contractAddress: string;
    apiUrl: string;
    DAppConfig: DAppConfig;
}


declare global {
    interface Window {
        CONFIG: any;
    }
}

const computeDAppConfig = (isStaging: boolean, alchemyUrl: string): DAppConfig => {
    return {
        readOnlyChainId: Mainnet.chainId,
        readOnlyUrls: {[Mainnet.chainId]: alchemyUrl},
        networks: [Mainnet],
    };
};


const computeConfig = (): FrontendConfig => {
    const buildType = getEnvironmentType();

    console.info('Build type [%s].', buildType);

    // Fetch config from injected config when in prod (see index.html)
    const {alchemyUrl, contractAddress, isStaging, apiUrl} = window.CONFIG || {
        alchemyUrl: getAlchemyUrl(),
        contractAddress: getContractAddress(),
        apiUrl: getBackendUrl(),
        // More or less a hack, we want to be on rinkeby on staging but we don't pass the environment type
        // we inject it directly in the config
        isStaging: buildType === EnvironmentType.DEBUG,
    };

    return {
        isDebug: buildType === EnvironmentType.DEBUG,
        isProduction: buildType === EnvironmentType.PROD,
        contractAddress: contractAddress,
        apiUrl,
        DAppConfig: computeDAppConfig(isStaging, alchemyUrl),
    };
};

const getEnvironmentType = (): EnvironmentType => {
    if (getBuildEnvironment() === 'production') {
        return EnvironmentType.PROD;
    }

    return EnvironmentType.DEBUG;
};

/**
 * The `process.env.NODE_ENV` variable is a special variable "injected" by Webpack
 * at runtime. The word "injected" is in double quotes for a good reason. Indeed,
 * the variable is not really injected, it's really a search & replace at build time
 * that is performed by Webpack. Meaning on the final bundle, this code will look
 * like `return "production"` (assuming `process.env.NODE_ENV` equals `production`).
 */
const getBuildEnvironment = (): string | undefined => process.env.NODE_ENV;
const getContractAddress = (): string => process.env.REACT_APP_CONTRACT_ADDRESS!;
const getBackendUrl = (): string => process.env.REACT_APP_BACKEND_URL!;
const getAlchemyUrl = (): string => process.env.REACT_APP_ALCHEMY_URL!;

export const Config: Readonly<FrontendConfig> = computeConfig();
