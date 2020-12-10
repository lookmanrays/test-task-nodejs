const assert = require("chai").assert;

describe("findDuplicateTransactions()", function() {
  it("returns empty array if there are no transactions", function() {
    assert.deepEqual(findDuplicateTransactions([]), []);
  });

  it("returns empty array if there are no duplicates", function() {
    const transactions = [
      {
        id: 3,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:34:30.000Z'
      },
      {
        id: 4,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:36:00.000Z'
      },
    ];

    assert.deepEqual(findDuplicateTransactions(transactions), []);
  });

  it("returns an array of duplicates", function() {
    const transactions = [
      {
        id: 3,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:34:30.000Z'
      },
      {
        id: 1,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:00.000Z'
      },
      {
        id: 6,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:05.000Z'
      },
      {
        id: 4,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:36:00.000Z'
      },
      {
        id: 2,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:50.000Z'
      },
      {
        id: 5,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:00.000Z'
      }
    ];

    assert.deepEqual(findDuplicateTransactions(transactions), [
      [
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:00.000Z"
        },
        {
          id: 2,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:50.000Z"
        },
        {
          id: 3,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:30.000Z"
        }
      ],
      [
        {
          id: 5,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "other",
          time: "2018-03-02T10:33:00.000Z"
        },
        {
          id: 6,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "other",
          time: "2018-03-02T10:33:05.000Z"
        }
      ]
    ]);
  })

  it("returns sorted by date (ASC) array of duplicates", function() {
    const transactions = [
      {
        id: 3,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:34:30.000Z'
      },
      {
        id: 1,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:00.000Z'
      },
      {
        id: 6,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:05.000Z'
      },
      {
        id: 4,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-02-02T10:36:00.000Z'
      },
      {
        id: 8,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-02-02T10:36:00.000Z'
      },
      {
        id: 2,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:50.000Z'
      },
      {
        id: 5,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:00.000Z'
      }
    ];

    assert.deepEqual(findDuplicateTransactions(transactions), [
      [
        {
          id: 4,
          sourceAccount: 'A',
          targetAccount: 'B',
          amount: 100,
          category: 'eating_out',
          time: '2018-02-02T10:36:00.000Z'
        },
        {
          id: 8,
          sourceAccount: 'A',
          targetAccount: 'B',
          amount: 100,
          category: 'eating_out',
          time: '2018-02-02T10:36:00.000Z'
        }
      ],
      [
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:00.000Z"
        },
        {
          id: 2,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:50.000Z"
        },
        {
          id: 3,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:30.000Z"
        }
      ],
      [
        {
          id: 5,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "other",
          time: "2018-03-02T10:33:00.000Z"
        },
        {
          id: 6,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "other",
          time: "2018-03-02T10:33:05.000Z"
        }
      ]
    ]);
  });
});

describe("isGapBetweenTwoDatesLessThanAMinute()", function() {
  it("False for two dates with difference over a minute", function() {
    assert.equal(
      isGapBetweenTwoDatesLessThanAMinute('2018-03-02T10:33:00.000Z', '2018-03-02T10:34:10.000Z'),
      false,
    );
  });

  it("True for two dates with difference less than a minute", function() {
    assert.equal(
      isGapBetweenTwoDatesLessThanAMinute('2018-03-02T10:33:00.000Z', '2018-03-02T10:33:15.000Z'),
      true,
    );
    assert.equal(
      isGapBetweenTwoDatesLessThanAMinute('2018-03-02T10:33:00.000Z', '2018-03-02T10:33:00.000Z'),
      true,
    );
  });
});

describe("compareTransactionsByTime()", function() {
  it("1 if first > second", function() {
    assert.equal(
      compareTransactionsByTime({ time: '2018-03-02T10:35:00.000Z' }, { time: '2018-03-02T10:34:10.000Z' }),
      1,
    );
  });
  it("-1 if first > second", function() {
    assert.equal(
      compareTransactionsByTime({ time: '2018-03-02T10:33:00.000Z' }, { time: '2018-03-02T10:34:10.000Z' }),
      -1,
    );
  });
  it("0 if first === second", function() {
    assert.equal(
      compareTransactionsByTime({ time: '2018-03-02T10:33:00.000Z' }, { time: '2018-03-02T10:33:00.000Z' }),
      0,
    );
  });
});

describe("getTransactionsDictBySimilarity()", function() {
  it("Empty object for empty list of transactions", function() {
    assert.deepEqual(
      getTransactionsDictBySimilarity([]),
      {},
    );
  });

  it("Valid object of transactions by similarity", function() {
    const transactions = [
      {
        id: 1,
        sourceAccount: "A",
        targetAccount: "B",
        amount: 100,
        category: "eating_out",
        time: "2018-03-02T10:33:00.000Z"
      },
      {
        id: 2,
        sourceAccount: "A",
        targetAccount: "B",
        amount: 100,
        category: "eating_out",
        time: "2018-03-02T10:33:50.000Z"
      },
      {
        id: 3,
        sourceAccount: "A",
        targetAccount: "B",
        amount: 200,
        category: "eating_out",
        time: "2018-03-02T11:34:30.000Z"
      }
    ];

    assert.deepEqual(
      getTransactionsDictBySimilarity(transactions),
      {
        'ABeating_out100': [[
          {
            id: 1,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 100,
            category: "eating_out",
            time: "2018-03-02T10:33:00.000Z"
          },
          {
            id: 2,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 100,
            category: "eating_out",
            time: "2018-03-02T10:33:50.000Z"
          },
        ]],
        'ABeating_out200': [[
          {
            id: 3,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 200,
            category: "eating_out",
            time: "2018-03-02T11:34:30.000Z"
          },
        ]]
      });
  });
});

