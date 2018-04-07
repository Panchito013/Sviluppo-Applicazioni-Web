const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }

}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(Date.parse("01/01/2018"), [], 0);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Block successfully Mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let stewieCoin = new Blockchain();

stewieCoin.createTransaction(new Transaction('address1', 'address2', 100));
stewieCoin.createTransaction(new Transaction('address2', 'address1', 50));
stewieCoin.createTransaction(new Transaction('address2', 'address3', 100));


console.log("\nStarting the miner...");

stewieCoin.minePendingTransactions("stewies-address");
stewieCoin.minePendingTransactions("address1");
stewieCoin.minePendingTransactions("address2");
stewieCoin.minePendingTransactions("address3");

console.log("\n1 Balance of Stewie is : " + stewieCoin.getBalanceOfAddress("stewies-address"));
console.log("\n1 Balance of address1 is : " + stewieCoin.getBalanceOfAddress("address1"));
console.log("\n1 Balance of address2 is : " + stewieCoin.getBalanceOfAddress("address2"));
console.log("\n1 Balance of address3 is : " + stewieCoin.getBalanceOfAddress("address3"));
console.log("\nStarting the miner Again...");

stewieCoin.minePendingTransactions("stewies-address");
stewieCoin.minePendingTransactions("address1");
stewieCoin.minePendingTransactions("address2");
stewieCoin.minePendingTransactions("address3");

console.log("\n2 Balance of Stewie is : " + stewieCoin.getBalanceOfAddress("stewies-address"));
console.log("\n2 Balance of address1 is : " + stewieCoin.getBalanceOfAddress("address1"));
console.log("\n2 Balance of address2 is : " + stewieCoin.getBalanceOfAddress("address2"));
console.log("\n2 Balance of address3 is : " + stewieCoin.getBalanceOfAddress("address3"));
console.log("\nStarting the miner Again...");

stewieCoin.minePendingTransactions("stewies-address");
stewieCoin.minePendingTransactions("address1");
stewieCoin.minePendingTransactions("address2");
stewieCoin.minePendingTransactions("address3");

console.log("\n3 Balance of Stewie is : " + stewieCoin.getBalanceOfAddress("stewies-address"));
console.log("\n3 Balance of address1 is : " + stewieCoin.getBalanceOfAddress("address1"));
console.log("\n3 Balance of address2 is : " + stewieCoin.getBalanceOfAddress("address2"));
console.log("\n3 Balance of address3 is : " + stewieCoin.getBalanceOfAddress("address3"));
console.log("\nStarting the miner Again...");

stewieCoin.minePendingTransactions("stewies-address");
stewieCoin.minePendingTransactions("address1");
stewieCoin.minePendingTransactions("address2");
stewieCoin.minePendingTransactions("address3");

console.log("\n4 Balance of Stewie is : " + stewieCoin.getBalanceOfAddress("stewies-address"));
console.log("\n4 Balance of address1 is : " + stewieCoin.getBalanceOfAddress("address1"));
console.log("\n4 Balance of address2 is : " + stewieCoin.getBalanceOfAddress("address2"));
console.log("\n4 Balance of address3 is : " + stewieCoin.getBalanceOfAddress("address3"));


console.log(JSON.stringify(stewieCoin, null, 4));
console.log('Blockchain valid? ' + stewieCoin.isChainValid());