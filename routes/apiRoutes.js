const router = require("express").Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
    //get all the notes from db.json file
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    })
    // res.json(`GOT YOUR ${req.method} REQUEST`)
})

router.post('/', (req, res) => {
    // add a note to the db file
    const { title, text } = req.body;
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
          title,
          text,
          id: uuidv4(),
        };
    
        readAndAppend(newNote, './db/db.json');
    
        const response = {
          status: 'success',
          body: newNote,
        };
    
        res.json(response);
    } else {
        res.json('Error in posting feedback');
      }

    
    // res.json(`GOT YOUR ${req.method} REQUEST`)
})

// BONUS - be able to delete a note from the route

router.delete('/:note_id', (req, res) => {

    console.log(req.params.note_id)
    if (req.params.note_id){
        readFromFile('./db/db.json').then((data) => {
            notesData = JSON.parse(data)
            for (let i = 0; i < notesData.length; i++){
                // console.log(i)
                console.log(notesData[i])
                console.log(notesData[i].id)
                if (notesData[i].id == req.params.note_id){
                    notesData.splice(i,1);
                    writeToFile('./db/db.json', notesData)
                    return;
                    // console.log(`${i} is the index to remove`)
                }
            }
        })
    }
    // res.sendFile(path.join(__dirname, './public/notes.html'))
    res.send(`GOT YOUR ${req.method} REQUEST`)
})

module.exports = router;