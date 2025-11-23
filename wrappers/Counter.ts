import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type CounterConfig = {
    counter: number;
};

export function counterConfigToCell(config: CounterConfig): Cell {
    return beginCell().storeUint(config.counter, 64).endCell();
}

export class Counter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Counter(address);
    }

    static createFromConfig(config: CounterConfig, code: Cell, workchain = 0) {
        const data = counterConfigToCell(config);
        const init = { code, data };
        return new Counter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    // New: Send increase message
    async sendIncrease(provider: ContractProvider, via: Sender, opts: { increaseBy: number; value: bigint }) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x7e8764ef, 32)
                .storeUint(opts.increaseBy, 32)
                .endCell(),
        });
    }

    // New: Send reset message
    async sendReset(provider: ContractProvider, via: Sender, opts: { value: bigint }) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x3a752f06, 32)
                .endCell(),
        });
    }

    // New: Get counter value
    async getCounter(provider: ContractProvider) {
        const result = await provider.get('currentCounter', []);
        return result.stack.readNumber();
    }
}