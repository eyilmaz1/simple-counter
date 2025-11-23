import { Address } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromAddress(
            Address.parseFriendly('kQBc5iJylS1jtxAZeONWMZD9LLaI827xnnWmyLhyKTEhr1lH').address
        )
    );

    const value = await counter.getCounter();
    console.log('Current counter value:', value);
}