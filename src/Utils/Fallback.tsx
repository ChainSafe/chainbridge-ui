export class Fallback {
  private interval?: ReturnType<typeof setTimeout>;
  private timeout?: ReturnType<typeof setTimeout>;

  constructor(
    private delayMs: number,
    private pollingIntervalMs: number,
    private pollingCallback: () => Promise<boolean>
  ) {}

  start(): void {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(async () => {
        const res = await this.pollingCallback();
        if (!res && this.started()) this.stop();
      }, this.pollingIntervalMs);
      console.log("Fallback started");
    }, this.delayMs);
  }

  stop(): void {
    if (!this.started()) return;
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

  started(): boolean {
    return !!(this.timeout || this.interval);
  }
}
