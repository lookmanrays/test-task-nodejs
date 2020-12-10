// Sometimes when a customer is charged, there is a duplicate transaction created. We need to find those transactions so that they can be dealt with. Everything about the transaction should be identical, except the transaction id and the time at which it occurred, as there can be up to a minute delay.

// findDuplicateTransactions(transactions)

// Find all transactions that have the same sourceAccount, targetAccount, category, amount, and the time difference between each consecutive transaction is less than 1 minute.

// Input

// You can assume that all parameters will always be present and valid. However, the incoming transactions are not guaranteed to be in any particular order.

// list of transactions (Transaction[])
// Output

// list of all the duplicate transaction groups, ordered by time ascending (Transaction[][]) The groups should be sorted in ascending order of the first transaction in the group.
// Example

// Input transactions:

// [
//   {
//     id: 3,
//     sourceAccount: 'A',
//     targetAccount: 'B',
//     amount: 100,
//     category: 'eating_out',
//     time: '2018-03-02T10:34:30.000Z'
//   },
//   {
//     id: 1,
//     sourceAccount: 'A',
//     targetAccount: 'B',
//     amount: 100,
//     category: 'eating_out',
//     time: '2018-03-02T10:33:00.000Z'
//   },
//   {
//     id: 6,
//     sourceAccount: 'A',
//     targetAccount: 'C',
//     amount: 250,
//     category: 'other',
//     time: '2018-03-02T10:33:05.000Z'
//   },
//   {
//     id: 4,
//     sourceAccount: 'A',
//     targetAccount: 'B',
//     amount: 100,
//     category: 'eating_out',
//     time: '2018-03-02T10:36:00.000Z'
//   },
//   {
//     id: 2,
//     sourceAccount: 'A',
//     targetAccount: 'B',
//     amount: 100,
//     category: 'eating_out',
//     time: '2018-03-02T10:33:50.000Z'
//   },
//   {
//     id: 5,
//     sourceAccount: 'A',
//     targetAccount: 'C',
//     amount: 250,
//     category: 'other',
//     time: '2018-03-02T10:33:00.000Z'
//   }
// ];
// Expected output:

// [
//   [
//     {
//       id: 1,
//       sourceAccount: "A",
//       targetAccount: "B",
//       amount: 100,
//       category: "eating_out",
//       time: "2018-03-02T10:33:00.000Z"
//     },
//     {
//       id: 2,
//       sourceAccount: "A",
//       targetAccount: "B",
//       amount: 100,
//       category: "eating_out",
//       time: "2018-03-02T10:33:50.000Z"
//     },
//     {
//       id: 3,
//       sourceAccount: "A",
//       targetAccount: "B",
//       amount: 100,
//       category: "eating_out",
//       time: "2018-03-02T10:34:30.000Z"
//     }
//   ],
//   [
//     {
//       id: 5,
//       sourceAccount: "A",
//       targetAccount: "C",
//       amount: 250,
//       category: "other",
//       time: "2018-03-02T10:33:00.000Z"
//     },
//     {
//       id: 6,
//       sourceAccount: "A",
//       targetAccount: "C",
//       amount: 250,
//       category: "other",
//       time: "2018-03-02T10:33:05.000Z"
//     }
//   ]
// ];

/**
 * Check the gap between two dates less than a minute
 *
 * @param {String} first date
 * @param {String} second date
 *
 * @returns {Boolean} statement that the difference between time less than a minute
 */
const isGapBetweenTwoDatesLessThanAMinute = (first, second) => {
  const convertedFirstDate = (new Date(first)).getTime();
  const convertedSecondDate = (new Date(second)).getTime();

  return convertedSecondDate - convertedFirstDate < 60000;
};

/**
 * Compare transaction list by time
 * @param {Object} first transaction
 * @param {Object} second transaction
 *
 * @returns {Number} result of comparison
 */
const compareTransactionsByTime = (first, second) => {
  const firstTimeConverted = (new Date(first.time)).getTime();
  const secondTimeConverted = (new Date(second.time)).getTime();

  if (firstTimeConverted > secondTimeConverted) return 1;
  if (firstTimeConverted < secondTimeConverted) return -1;

  return 0;
};

/**
 * Get sorted transaction list by time
 * @param {Object[]} list of transactions
 *
 * @returns {Object[]} sorted list of transactions
 */
const getSortedTransactionsByTime = (list) => list.sort(compareTransactionsByTime);

/**
 * Get transactions hash by sourceAccount+targetAccount+category+amount identity
 * @param {Object[]} list (sorted ASC) of transactions
 *
 * @returns {Object} transactions hash {
 *   `${sourceAccount}${targetAccount}${category}${amount}`: [[{...transaction}], [{...transaction}]]
 * }
 * The value of the hash is an array of arrays of transactions split by duplication
 * which based on a less than a minute gap)
 */
const getTransactionsDictBySimilarity = (list) =>
  list.reduce((sum, curr) => {
    const { sourceAccount, targetAccount, category, amount } = curr;
    const key = `${sourceAccount}${targetAccount}${category}${amount}`;

    if (sum[key]) {
      let linkToActualSubArray = sum[key][sum[key].length - 1];

      if (isGapBetweenTwoDatesLessThanAMinute(
        linkToActualSubArray[linkToActualSubArray.length - 1].time,
        curr.time,
      )) {
        linkToActualSubArray.push(curr);
      } else {
        sum[key].push([curr]);
      }
    } else {
      sum[key] = [[curr]];
    }

    return sum;
  }, {});

/**
 * Get transactions duplicates by sourceAccount+targetAccount+category+amount
 * and a gap between two transactions less than a minute
 *
 * @param {Object[]} transactions list
 * transaction example = {
 *    id: 5,
 *    sourceAccount: "A",
 *    targetAccount: "C",
 *    amount: 250,
 *    category: "other",
 *    time: "2018-03-02T10:33:00.000Z"
 *  }
 *
 * @returns {Array[]} array of lists of duplicated transactions [[{...transaction}, {...transaction}]]
 */
function findDuplicateTransactions (transactions = []) {
  if (transactions.length === 0) return [];

  const transactionsSorted = getSortedTransactionsByTime([...transactions]);
  const tempObject = getTransactionsDictBySimilarity(transactionsSorted);
  const allTransactionsListWithDuplicatesSplitting = Object.keys(tempObject).reduce(
    (sum, curr) => {
      sum.push(...tempObject[curr]);

      return sum;
    }, [],
  );

  return allTransactionsListWithDuplicatesSplitting
    .filter((transactions) => transactions.length > 1)
    .sort((a, b) => compareTransactionsByTime(a[0], b[0]));
}
