import { Address, toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromAddress(
            Address.parseFriendly('kQBc5iJylS1jtxAZeONWMZD9LLaI827xnnWmyLhyKTEhr1lH').address
        )
    );

    await counter.sendIncrease(provider.sender(), {
        increaseBy: 5,           // change this number if you want
        value: toNano('0.05'),   // gas
    });

    console.log('Increase message sent!');
}