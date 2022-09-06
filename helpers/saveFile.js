const fs = require('fs');

const file = './db/data.json'



const saveDb = ( data ) => {
    // JSON.stringify convert an ocject in string
    fs.writeFileSync( file, JSON.stringify(data));
}



const readDb = () => {
    if ( !fs.existsSync ) {
        return null;
    }
    const info = fs.readFileSync(file, { encoding: 'utf-8' }) ;
    // JSON.parse is for past of string to array
    const data = JSON.parse( info );
    return data;
}



module.exports = {
    saveDb,
    readDb
}