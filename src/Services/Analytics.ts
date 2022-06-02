import { GA } from "../Utils/GA";

type Options = {
  ga: {
    trackingId: string;
    appName: string;
    env: string;
  };
};

type TransferEventData = {
  address: string;
  recipient: string;
  amount: number;
  nonce?: number;
};

class AnalyticsService {
  ga: GA;

  constructor(options: Options) {
    this.ga = new GA(options.ga);
  }

  trackTransferInTransitEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_in_transit", {
      address,
      recipient,
      nonce,
      amount,
    });
  }

  trackTransferCompletedEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_completed", {
      address,
      recipient,
      nonce,
      amount,
    });
  }

  trackTransferCompletedFromFallbackEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_completed_from_fallback", {
      address,
      recipient,
      nonce,
      amount,
    });
  }

  trackTransferAbortedEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_aborted", {
      address,
      recipient,
      nonce,
      amount,
    });
  }

  trackTransferAbortedFromFallbackEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_aborted_fallback", {
      address,
      recipient,
      nonce,
      amount,
    });
  }
}

export default AnalyticsService;
