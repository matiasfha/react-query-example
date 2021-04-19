
var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY }).base(
    "appy79pGZl0D8nLjr"
);
export default async (req, res) => {
    try {
        if (req.method === 'GET') {
            return await GET(req, res)
        } else if (req.method === 'PATCH') {
            return await PATCH(req, res)
        } else if (req.method === 'DELETE') {
            return await DELETE(req, res)
        }
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'An unknown error occurred!' })
    }
}

async function GET(req, res) {
    const {
        query: { postId },
    } = req

    const row = (await db.get()).posts.find((d) => d.id == postId)

    if (!row) {
        res.status(404)
        return res.send('Not found')
    }

    res.json(row)
}

async function PATCH(req, res) {
    const {
        query: { todoId },
        body,
    } = req

    const record = {
        id: todoId,
        fields: {
            Title: body.title,
            Status: body.status
        }
    }

    base('Table 1').update([record], function (err, records) {
        if (err) {
            console.error(err)
            res.status(500)
            res.json({ message: 'An unknown error occurred!' })
            res.end()
        }
        const record = records.find(item => item.id === todoId)
        res.json({
            id: record.id,
            status: record.get('Status'),
            title: record.get('Title')
        })
    });
}

async function DELETE(req, res) {
    const {
        query: { todoId },
    } = req
    console.log({ todoId })
    base('Table 1').destroy([todoId], function (err, record) {
        if (err) {
            console.error(err);
            res.status(500)
            res.json({ message: 'An unknown error occurred!' })
            res.end()
            return;
        }
        res.json({
            id: todoId,
            status: record[0].get('Status'),
            title: record[0].get('Title')
        })
    });
}