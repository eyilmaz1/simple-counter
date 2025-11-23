struct Storage {
    counter: uint64;
}

fun Storage.load(): Storage {
    return Storage.fromCell(contract.getData());
}

fun Storage.save(self) {
    contract.setData(self.toCell());
}

// Messages
struct(0x7e8764ef) IncreaseCounter { increaseBy: uint32 }
struct(0x3a752f06) ResetCounter {}

type AllowedMessage = IncreaseCounter | ResetCounter

fun onInternalMessage(in: InMessage) {
    var storage = Storage.load();

    val msg = lazy AllowedMessage.fromSlice(in.body);
    match (msg) {
        IncreaseCounter => { storage.counter += msg.increaseBy; }
        ResetCounter    => { storage.counter = 0; }
        else            => { throw 0xFFFF; }
    }

    storage.save();
}

get fun currentCounter(): int {
    return Storage.load().counter;
}