const express = require('express');

const app = express();

const port = 3000

app.listen(port, () =>{
    console.log('Listening on port ${port}')
});
s
const fs = require('fs');

const data = fs.readFileSync('data.json');
const jsonData = JSON.parse(data);

app.get('/', (req, res) => {
    res.json(jsonData);
})


app.get('/:chapterId', (req, res) => {
    const chapterId = req.params.chapterId;
    const chapter = jsonData.chapters.find(c => c.chapterno === chapterId);
    res.json(chapter);
  });
  

app.get('/:chapterId/:verseNo', (req, res) => {
    const chapterId = req.params.chapterId;
    const verseNo = req.params.verseNo;
    const chapter = jsonData.chapters.find(c => c.chapterno === chapterId);
    if (!chapter) {
      res.status(404).send('Chapter not found');
    } else {
      const verse = chapter.verses.find(v => v.verseno === verseNo);
      if (!verse) {
        res.status(404).send('Verse not found');
      } else {
        const result = {
          verseNo: verse.verseno,
          sansEng: verse['sans-eng'],
          trans: verse.trans
        };
        res.json(result);
      }
    }
  });
  