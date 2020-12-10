// Balance by category
// Calculate the balance in a specific category within the specified time period.
//
// getBalanceByCategoryInPeriod(transactionsList, category, startTime, endTime)
// Input
//
// You can assume that all parameters will always be present and valid.
//
//   list of transactions (Transaction[])
//   category (String)
//   start time (inclusive) (Date)
//   end time (exclusive) (Date)
// Output
//   Total balance (Number)
//
// Negative number means money spent.
//
//   Remember, this is what a transaction looks like:
//
// {
//   id: 123,
//     sourceAccount: 'my_account',
//   targetAccount: 'coffee_shop',
//   amount: -30,
//   category: 'eating_out',
//   time: '2018-03-12T12:34:00Z'
// }


/**
 * Check is time in range
 *
 * @param {String} time category name
 * @param {String} rangeStart range date
 * @param {String} rangeEnd range date
 *
 * @returns {Boolean}
 */
const isTimeInRange = (time, rangeStart, rangeEnd) => {
  const convertedTime = (new Date(time)).getTime();
  const rangeStartDateObject = new Date(rangeStart);
  const rangeEndDateObject = new Date(rangeEnd);

  // Setting the start of the day of the 'start' date (to include 'start')
  rangeEndDateObject.setHours(0, 0, 0, 0);

  const convertedRangeStart = rangeStartDateObject.getTime();
  const convertedRangeEnd = rangeEndDateObject.getTime();

  return convertedTime >= convertedRangeStart && convertedTime <= convertedRangeEnd;
};

/**
 * Filtering transaction list by passed category and time range
 *
 * @param {Object[]} list of transactions [{...transaction}]
 * @param {String} category category name
 * @param {String} start range date
 * @param {String} end range date
 *
 * @returns {Object[]} filtered transactions [{...transaction}]
 */
const filterTransactionsByCategoryAndTimePeriod = (list, category, start, end) =>
  list.filter((item) => item.category === category && isTimeInRange(item.time, start, end));

/**
 * Sort expression function for transactions (by time)
 * @param {Object} first transaction { time: '2018-03-12T12:34:00Z', ...transaction }
 * @param {Object} second transaction { time: '2018-03-12T12:34:00Z', ...transaction }
 * @returns {number}
 */
// const sortTransactionsByTimeFunction = (first, second) => {
//   const firstTime = (new Date(first.time)).getTime();
//   const secondTime = (new Date(second.time)).getTime();

//   if (firstTime > secondTime) {
//     return 1;
//   }

//   if (firstTime < secondTime) {
//     return -1;
//   }

//   return 0;
// }

/**
 * Get total balance of a category in a range
 *
 * @param {Object[]} transactions list {
 *   id: 123,
 *   sourceAccount: 'my_account',
 *   targetAccount: 'coffee_shop',
 *   amount: -30,
 *   category: 'eating_out',
 *   time: '2018-03-12T12:34:00Z'
 * }
 * @param {String} category name
 * @param {String} start range date
 * @param {String} end range date
 *
 * @returns {number} total balance
 */
function getBalanceByCategoryInPeriod (transactions = [], category, start, end) {
  // Return 0 if no transactions in the list
  if (transactions.length === 0) return 0;

  const filteredByCategoryAndTimePeriod =
    filterTransactionsByCategoryAndTimePeriod(transactions, category, start, end);

  // Return 0 if no transactions in the filtered list
  if (filteredByCategoryAndTimePeriod.length === 0) return 0;

  // sort filtered transactions by time
  // filteredByCategoryAndTimePeriod.sort(sortTransactionsByTimeFunction);

  return filteredByCategoryAndTimePeriod.reduce((sum, curr, index) => sum + curr.amount, 0);
}




