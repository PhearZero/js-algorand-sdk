import JSONRequest from '../jsonrequest';
import HTTPClient from '../../client';
import * as encoding from '../../../encoding/encoding';
import { PendingTransactionsResponse } from './models/types';

/**
 * returns all transactions for a PK [addr] in the [first, last] rounds range.
 */
export default class PendingTransactionsByAddress extends JSONRequest<
  PendingTransactionsResponse,
  Uint8Array
> {
  constructor(c: HTTPClient, private address: string) {
    super(c);
    this.address = address;
    this.query.format = 'msgpack';
  }

  // eslint-disable-next-line class-methods-use-this
  prepare(body: Uint8Array): PendingTransactionsResponse {
    if (body && body.byteLength > 0) {
      return PendingTransactionsResponse.from_obj_for_encoding(
        encoding.decode(body)
      );
    }
    return undefined;
  }

  path() {
    return `/v2/accounts/${this.address}/transactions/pending`;
  }

  // max sets the maximum number of txs to return
  max(max: number) {
    this.query.max = max;
    return this;
  }
}
