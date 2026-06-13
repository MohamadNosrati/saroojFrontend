export interface IKeys {
  p256dh: string;
  auth: string;
}

export interface ISubscriptionPayload {
  endpoint: string;
  expirationTime: number | null;
  keys: IKeys;
}
