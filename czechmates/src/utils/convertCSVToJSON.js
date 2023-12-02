// https://www.npmjs.com/package/csvtojson

// change these
const writefile = "./attributeDesc.json"

const csvFilePath="./attributesDesc.csv"
var fs = require('fs');
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
 
async function convert(){
    const statusArray= await csv().fromFile(csvFilePath);
    fs.writeFileSync(writefile, JSON.stringify(statusArray));
}

convert();
