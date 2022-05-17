export class Fallback {
  private interval?: ReturnType<typeof setTimeout>;
  private timeout?: ReturnType<typeof setTimeout>;

  constructor(
    private delayMs: number,
    private pollingIntervalMs: number,
    private pollingCb: () => Promise<boolean>
  ) {}

  async init() {
    this.timeout = setTimeout(async () => {
      this.interval = setInterval(async () => {
        const res = await this.pollingCb();
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
  }

  initialized() {
    return this.timeout || this.interval;
  }
}
