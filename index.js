const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'goodreads.db')

const app = express()

let db = null

//given function used to initilize a server and database using above package and module and it members
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    }) //using open fuunction express server connect with the server
    app.listen(3000, () => {
      console.log('Hii Thaara')
    }) // using listen method it start app and listen given portnumber : 3000 ;
  } catch (error) {
    console.log(`the error is ${error.message}`)
    process.exit(1) //terminate the process with the exit code.
  }
}
initializeDbAndServer() //calling the function

app.get('/', async (request, response) => {
  const bookGetQuery = `
  select 
  * 
  from 
  book 
  order by 
  book_id 
  ;
   `
  const bookArray = await db.all(bookGetQuery)

  response.send(bookArray)
})
