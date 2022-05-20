import ReactGA from "react-ga4";

type EventData = {
  [key: string]: any;
};

type Options = {
  trackingId: string;
  appName: string;
  env: string;
};

export class GA {
  private ga: typeof ReactGA;
  private appName: string;
  private env: string;

  constructor(options: Options) {
    ReactGA.initialize(options.trackingId);
    this.ga = ReactGA;
    this.appName = options.appName;
    this.env = options.env;
  }

  event(name: string, data: EventData) {
    data.appName = this.appName;
    data.env = this.env;
    data.date = new Date().toISOString();
    this.ga.event(name, data);
  }
}
