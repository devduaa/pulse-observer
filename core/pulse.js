const { Worker } = require("worker_threads");
const store = require("./metrics.store");
const renderTerminal = require("../renderers/terminal");

class Pulse {
  constructor(options = {}) {
    this.options = {
      renderer: "terminal",
      interval: 1000,
      ...options
    };

    this.worker = new Worker(
      require.resolve("../workers/eventLoop.worker")
    );

    this.worker.on("message", msg => {
      store.update(msg);
    });

    this.timer = setInterval(() => {
      store.updateMemory();
      renderTerminal(store.snapshot());
    }, this.options.interval);
  }

  middleware() {
    return require("../middleware/express")(store);
  }
}

module.exports = Pulse;
