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
      address: `"${address}"`,
      recipient: `"${recipient}"`,
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
      address: `"${address}"`,
      recipient: `"${recipient}"`,
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
      address: `"${address}"`,
      recipient: `"${recipient}"`,
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
      address: `"${address}"`,
      recipient: `"${recipient}"`,
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
      address: `"${address}"`,
      recipient: `"${recipient}"`,
      nonce,
      amount,
    });
  }
}

export default AnalyticsService;
