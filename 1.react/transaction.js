function setState() {}

class Transaction {
  constructor(wrappers) {
    this.wrappers = wrappers; //{initialize,close}
  }
  perform(anyMethod) {
    this.wrappers.forEach((wrapper) => wrapper.initialize());
    anyMethod.call();
    this.wrappers.forEach((wrapper) => wrapper.close());
  }
}

let transaction = new Transaction([
  {
    initialize() {
      console.log("initialize");
    },
    close() {
      console.log("close");
    },
  },
  {
    initialize() {
      console.log("initialize2");
    },
    close() {
      console.log("close2");
    },
  },
]);

transaction.perform(setState);
