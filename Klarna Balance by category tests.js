const assert = require("chai").assert;

describe("getBalanceByCategoryInPeriod()", function() {
  it("returns 0 if there are no transactions", function() {
    assert.equal(
      getBalanceByCategoryInPeriod(
        [],
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      0
    );
  });

  // add your tests here
  it("returns transaction amount if there is only one transaction", function() {
    const transactions = [{
      id: 123,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -30,
      category: 'eating_out',
      time: '2018-03-12T12:34:00Z'
    }];

    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      transactions[0].amount
    );
  });

  it("returns 0 if no transactions in the time range", function() {
    const transactions = [
      {
        id: 123,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -30,
        category: 'eating_out',
        time: '2018-03-12T12:34:00Z'
      },
      {
        id: 124,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -70,
        category: 'eating_out',
        time: '2018-03-01T12:34:00Z'
      },
    ];
    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-02-01"),
        new Date("2018-02-28")
      ),
      0
    );
  });

  it("returns 0 if no transactions in the category", function() {
    const transactions = [
      {
        id: 123,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -30,
        category: 'eating_out',
        time: '2018-03-12T12:34:00Z'
      },
      {
        id: 124,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -70,
        category: 'eating_out',
        time: '2018-03-01T12:34:00Z'
      },
    ];
    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      0
    );
  });

  it("returns total balance of transactions in the time range", function() {
    const transactions = [
      {
        id: 123,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -30,
        category: 'eating_out',
        time: '2018-03-12T12:34:00Z'
      },
      {
        id: 124,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -70,
        category: 'eating_out',
        time: '2018-03-01T12:34:00Z'
      },
      {
        id: 114,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: 70,
        category: 'eating_out',
        time: '2018-03-04T12:34:00Z'
      },
      {
        id: 111,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -10,
        category: 'eating_out',
        time: '2018-03-09T12:34:00Z'
      },
      {
        id: 118,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -60,
        category: 'eating_out',
        time: '2018-03-19T12:34:00Z'
      },
      {
        id: 98,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: 100,
        category: 'eating_out',
        time: '2018-02-19T12:34:00Z'
      },
      {
        id: 104,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -270,
        category: 'eating_out',
        time: '2018-02-01T12:34:00Z'
      },
    ];
    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-03-01"),
        new Date("2018-03-31")
      ),
      -100
    );
  });

  it("returns total balance of transactions in the time range (transactions on 'start' and on 'end')", function() {
    const transactions = [
      {
        id: 123,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -30,
        category: 'eating_out',
        time: '2018-03-12T12:34:00Z'
      },
      {
        id: 111,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -10,
        category: 'eating_out',
        time: '2018-03-09T12:34:00Z'
      },
      {
        id: 118,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -60,
        category: 'eating_out',
        time: '2018-03-19T12:34:00Z'
      },
    ];
    assert.equal(
      getBalanceByCategoryInPeriod(
        transactions,
        "eating_out",
        new Date("2018-03-09"),
        new Date("2018-03-19")
      ),
      -40
    );
  });
});

describe("isTimeInRange()", function() {
  it("returns false if time < range start", function() {
    assert.equal(
      isTimeInRange('2018-03-11', '2018-03-12T12:34:00Z', '2018-03-22T12:34:00Z'),
      false
    );
  });

  it("returns false if time > range start", function() {
    assert.equal(
      isTimeInRange('2018-03-23', '2018-03-12T12:34:00Z', '2018-03-22T12:34:00Z'),
      false
    );
  });

  it("returns true if time in range", function() {
    assert.equal(
      isTimeInRange('2018-03-11', '2018-03-10T12:34:00Z', '2018-03-22T12:34:00Z'),
      true
    );
  });
});

describe("filterTransactionsByCategoryAndTimePeriod()", function() {
  const transactions = [
    {
      id: 123,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -30,
      category: 'eating_out',
      time: '2018-03-12T12:34:00Z'
    },
    {
      id: 124,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -70,
      category: 'eating_out',
      time: '2018-03-01T12:34:00Z'
    },
    {
      id: 114,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: 70,
      category: 'eating_out',
      time: '2018-03-04T12:34:00Z'
    },
    {
      id: 111,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -10,
      category: 'eating_out',
      time: '2018-03-09T12:34:00Z'
    },
    {
      id: 118,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -60,
      category: 'eating_out',
      time: '2018-03-19T12:34:00Z'
    },
    {
      id: 98,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: 100,
      category: 'eating_out',
      time: '2018-02-19T12:34:00Z'
    },
    {
      id: 104,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -270,
      category: 'eating_out',
      time: '2018-02-01T12:34:00Z'
    },
  ];

  it("returns 0 if no transactions in the list", function() {
    assert.equal(
      filterTransactionsByCategoryAndTimePeriod(
        transactions,
        'category',
        '2018-03-01',
        '2018-03-31'
      ).length,
      0
    );
  });

  it("returns 0 if no transactions in the time range", function() {
    assert.equal(
      filterTransactionsByCategoryAndTimePeriod(
        transactions,
        'category',
        '2018-01-01',
        '2018-01-31'
      ).length,
      0
    );
  });

  it("returns filtered transactions in the list", function() {
    assert.equal(
      filterTransactionsByCategoryAndTimePeriod(
        transactions,
        'eating_out',
        '2018-03-01',
        '2018-03-31'
      ).length,
      5
    );
  });
});

// describe("sortTransactionsByTimeFunction()", function() {
//   it("returns -1 if first < second", function() {
//     assert.equal(
//       sortTransactionsByTimeFunction(
//         { time: '2018-03-01' },
//         { time: '2018-03-05' },
//       ),
//       -1
//     );
//   });

//   it("returns 1 if first > second", function() {
//     assert.equal(
//       sortTransactionsByTimeFunction(
//         { time: '2018-03-09' },
//         { time: '2018-03-05' },
//       ),
//       1
//     );
//   });

//   it("returns 0 if first === second", function() {
//     assert.equal(
//       sortTransactionsByTimeFunction(
//         { time: '2018-03-05' },
//         { time: '2018-03-05' },
//       ),
//       0
//     );
//   });
// });



