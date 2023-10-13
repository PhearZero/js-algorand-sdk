import { TransactionType, TransactionParams } from './base.js';
import { ConstructTransaction } from './builder.js';

type SpecificParameters = Pick<
  TransactionParams,
  'receiver' | 'amount' | 'closeRemainderTo'
>;

interface Overwrites {
  type?: TransactionType.pay;
}

type PaymentTransaction = ConstructTransaction<SpecificParameters, Overwrites>;
export default PaymentTransaction;
