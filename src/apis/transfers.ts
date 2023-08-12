import { BaseTransaction, TokenBalance } from '@gnosis.pm/safe-apps-sdk';
import { ERC_20_ABI } from '../abis/erc20';
const abiCoder = require('web3-eth-abi');

function encodeTxData(method: any, recipient: string, amount: string): string {
    const coder = abiCoder;
    return coder.encodeFunctionCall(method, [recipient, amount]);
}

function getTransferTransaction(item: TokenBalance, recipient: string): BaseTransaction {
    if (item.tokenInfo.type === 'NATIVE_TOKEN') {
        return {
            // Send ETH directly to the recipient address
            to: recipient,
            value: item.balance,
            data: '0x',
        };
    }

    return {
        // For other token types, generate a contract tx
        to: item.tokenInfo.address,
        value: '0',
        data: encodeTxData(ERC_20_ABI.transfer, recipient, item.balance),
    };
}

export { getTransferTransaction };