import express from 'express'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
// const PORT = parseInt(process.env.PORT) || 8080;
const PORT = 8080;

const app = express();
const abc = join(dirname(fileURLToPath(import.meta.url)));
console.log(abc)
app.use('/static', express.static(abc+'/static'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: dirname(fileURLToPath(import.meta.url))});
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit')
})
