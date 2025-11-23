import { Address, toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromAddress(
            Address.parseFriendly('kQBc5iJylS1jtxAZeONWMZD9LLaI827xnnWmyLhyKTEhr1lH').address
        )
    );

    await counter.sendReset(provider.sender(), {
        value: toNano('0.05'),
    });

    console.log('Reset message sent!');
}