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

type EventTime = {
  timeMs: number;
};

class AnalyticsService {
  ga: GA;

  constructor(options: Options) {
    this.ga = new GA(options.ga);
  }

  trackTransferInitializingEvent({
    address,
    recipient,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_initializing", {
      address: `"${address}"`,
      recipient: `"${recipient}"`,
      amount,
    });
  }

  trackTransferFromSourceEvent({
    address,
    recipient,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_from_source", {
      address: `"${address}"`,
      recipient: `"${recipient}"`,
      amount,
    });
  }

  trackTransferToDestinationEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_to_destination", {
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

  trackTransferUndefinedTxHash({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.trackEvent("transfer_undefined_tx_hash", {
      address: `"${address}"`,
      recipient: `"${recipient}"`,
      nonce,
      amount,
    });
  }

  trackGotTransferTxHash({
    address,
    recipient,
    nonce,
    amount,
    timeMs,
  }: TransferEventData & EventTime) {
    this.ga.trackEvent("transfer_got_tx_hash", {
      address: `"${address}"`,
      recipient: `"${recipient}"`,
      nonce,
      amount,
      timeMs,
    });
  }
}

export default AnalyticsService;
