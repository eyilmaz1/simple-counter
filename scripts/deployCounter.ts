import { toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { NetworkProvider, compile } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromConfig(
            { counter: 0 },                // ← important: initialize with 0
            await compile('Counter')
        )
    );

    await counter.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(counter.address);
    console.log('Deployed at:', counter.address.toString({ bounceable: true, urlSafe: true }));
}