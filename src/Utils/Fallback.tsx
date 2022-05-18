export class Fallback {
  private interval?: ReturnType<typeof setTimeout>;
  private timeout?: ReturnType<typeof setTimeout>;

  constructor(
    private delayMs: number,
    private pollingIntervalMs: number,
    private pollingCallback: () => Promise<boolean>
  ) {}

  async init() {
    console.log("Fallback initialized");
    this.timeout = setTimeout(async () => {
      this.interval = setInterval(async () => {
        const res = await this.pollingCallback();
        if (!res) this.stop();
      }, this.pollingIntervalMs);
    }, this.delayMs);
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    console.log("Fallback stopped");
  }

  initialized() {
    return this.timeout || this.interval;
  }
}
