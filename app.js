const { json } = require('express')
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const { once } = require('events');
const { spawn } = require('child_process');
const { resolve } = require('path')
const { get } = require('http')
//middleware
mongoose.connect('mongodb://localhost:27017/dhrishti_database', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.all('/api/:tbs', async (req,res) => {
    const {tbs} = req.params
    const records = await Todo.findOne({keyword:tbs})
    if(records == null || records.length == 0 ){
      
        var final_summary = await ask_for_summary(tbs)
        res.send(`${final_summary}`)
    }
    else{
      res.send(records.summary)
    }
    
    
    
})



const ask_for_summary = async(search_key) =>  {
  var final_summary = await get_summary(search_key)
  const record = {keyword: search_key, summary: final_summary}
  const response = await Todo.create(record)
  console.log(response)
  return final_summary
}
const get_summary = async(search_key) =>{ //this function takes the keyword as parameter and returns the summary
   var summary;
  
   const childPython = await spawn('python', ['bert_summary.py', 'https://en.wikipedia.org/wiki/' + search_key]);
 
   childPython.stdout.on('data', (data) => {
       summary = data;
   });
 
   await once(childPython, 'close');
   console.log(`${summary}`)
   return summary;
}




app.listen(5000,()=> {
  console.log('server is running on port 5000')
})