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

  transferIntransitEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.event("transfer_intransit", {
      address,
      recipient,
      nonce,
      amount,
    });
  }

  transferCompletedEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.event("transfer_completed", {
      address,
      recipient,
      nonce,
      amount,
    });
  }

  fallbackTransferCompletedEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.event("fallback_transfer_completed", {
      address,
      recipient,
      nonce,
      amount,
    });
  }

  transferAbortedEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.event("transfer_aborted", {
      address,
      recipient,
      nonce,
      amount,
    });
  }

  fallbackTransferAbortedEvent({
    address,
    recipient,
    nonce,
    amount,
  }: TransferEventData) {
    this.ga.event("fallback_transfer_aborted", {
      address,
      recipient,
      nonce,
      amount,
    });
  }
}

export default AnalyticsService;
