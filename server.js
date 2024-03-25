const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Path menuju folder public dan file database.json di dalamnya
const publicFolderPath = path.join(__dirname, 'public');
const databasePath = path.join(publicFolderPath, 'database.json');
app.use(express.static(path.join(__dirname, 'public')));
// Middleware untuk mengakses file index.html di folder public
app.get('/db.json', (req, res) => {
    const filePath = path.join(__dirname, 'db.json');
    const data = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});


app.post('/saveData', (req, res) => {
    const data = req.body;

    // Baca data yang sudah ada di database.json
    fs.readFile(databasePath, 'utf8', (err, existingData) => {
        let jsonData = {};
        if (!err) {
            try {
                jsonData = JSON.parse(existingData);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                return res.status(500).send('Internal Server Error');
            }
        }

        // Tambahkan data baru
        const newData = { id: Date.now(), ...data };
        jsonData[newData.id] = newData;

        // Tulis kembali data ke dalam database.json
        fs.writeFile(databasePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.json({ message: 'Data saved successfully!', newData });
        });
    });
});

// Endpoint untuk mengambil data dari file database.json di dalam folder public
app.get('/getData', (req, res) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).send('Internal Server Error');
        }
    });
});


// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
