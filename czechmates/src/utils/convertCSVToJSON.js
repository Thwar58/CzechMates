// https://www.npmjs.com/package/csvtojson

/**
 * Purpose: convert a CSV file to an array with JSON objects, used to change tooltip descriptions from CSV to JSON
 * Params:
 * writefile: string, the path to the file you want to write the JSON to
 * csvFilePath: string, the path to the CSV file you want to convert
 */
const writefile = "./attributeDesc.json";
const csvFilePath="./attributesDesc.csv";

// requirements and an example of the read method from the website
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
 
// a function that runs the conversion
async function convert(){
    const statusArray= await csv().fromFile(csvFilePath);
    fs.writeFileSync(writefile, JSON.stringify(statusArray));
}

// calling the function
convert();
