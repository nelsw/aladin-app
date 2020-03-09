// import log4js from 'log4js'
import { Transaction, address as Address } from 'bitcoinjs-lib';

const SATOSHIS_IN_BTC = 100000000;

export function btcToSatoshis(amountInBtc) {
  return amountInBtc * SATOSHIS_IN_BTC;
}

export function satoshisToBtc(amountInSatoshis) {
  return (1.0 * amountInSatoshis) / SATOSHIS_IN_BTC;
}

export function broadcastTransaction(broadcastTransactionUrl, rawTransaction) {
  return new Promise((resolve, reject) => {
    const payload = { rawtx: rawTransaction };

    fetch(broadcastTransactionUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(response => response.text())
      .then(responseText => JSON.parse(responseText))
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        // logger.error('broadcastTransaction: error broadcasting transaction', error)
        reject(error);
      });
  });
}

export function getNetworkFee(bytes) {
  return new Promise((resolve, reject) => {
    fetch('https://bitcoinfees.21.co/api/v1/fees/recommended')
      .then(response => response.text())
      .then(responseText => JSON.parse(responseText))
      .then(responseJson => {
        const satoshisPerByte = responseJson.fastestFee;
        const fee = bytes * satoshisPerByte;
        resolve(fee);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Constructs a summary of what the user’s sending from a transaction hex
 * @param {string} txHex - Encoded transaction hex
 * @return {{ outs: { address: string, satoshis: number }[], total: number }}
 */
export function summarizeTransactionFromHex(txHex) {
  const tx = Transaction.fromHex(txHex);
  const outs = tx.outs.map(o => ({
    address: Address.fromOutputScript(o.script),
    satoshis: o.value,
  }));
  return {
    outs,
    total: outs.reduce((prev, o) => prev + o.satoshis, 0),
  };
}
