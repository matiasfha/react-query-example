var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY }).base(
  "appy79pGZl0D8nLjr"
);

async function GET(req, res) {
  const {
    query: { pageOffset, pageSize }
  } = req;

  const todos = [];
  base("Table 1")
    .select({
      view: "Grid view"
    })
    .eachPage(function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        todos.push(record);
      });
    });

  res.json(todos);
}
