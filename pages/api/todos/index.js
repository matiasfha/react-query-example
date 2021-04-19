var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY }).base(
  "appy79pGZl0D8nLjr"
);

export default async (req, res) => {
  try {
    if (req.method === 'GET') {
      return await GET(req, res)
    } else if (req.method === 'POST') {
      return await POST(req, res)
    }
  } catch (err) {
    console.error(err)
    res.status(500)
    res.json({ message: 'An unknown error occurred!' })
  }
}

async function POST(req, res) {
  const { body } = req;
  const { title } = body
  const record = {
    fields: {
      Title: title,
      Status: 'Todo'
    }
  }
  base('Table 1').create([record], function (err, records) {
    if (err) {
      res.status(500)
      res.json({ message: 'An unknown error occurred!' })
      res.end()
    }
    const todos = records.map(function (record) {
      return ({ id: record.id, status: record.get('Status'), title: record.get('Title') });
    });
    res.json(todos);
  });
}

async function GET(req, res) {
  const {
    query: { pageOffset, pageSize }
  } = req;

  const todos = [];

  return base('Table 1').select({
    maxRecords: 100,
    view: "Grid view",
    sort: [{ field: "created_at", direction: "desc" }]
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record) {
      todos.push({ id: record.id, status: record.get('Status'), title: record.get('Title') });
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

  }, function done(err) {
    if (err) { console.error(err); res.end(); return; }
    res.json(todos);
  });




}
