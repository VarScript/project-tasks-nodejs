require('colors');

const { inquirerMenu, 
        pause, 
        readInput,
        taskListDelete,
        confirm,
        showListCheck
} = require('./helpers/inquirer');

const { saveDb, readDb } = require('./helpers/saveFile');

const Tasks = require('./models/tasks');



const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDb = readDb();
    if ( tasksDb ){
        tasks.uploadTaksFromArray( tasksDb )
    }



    do{
        opt = await inquirerMenu(); 

        switch (opt) {

            case '1':
                const desc = await readInput('Description:'); 
                tasks.createTask(desc);
                break;

            case '2':
                tasks.completedList();
                break;

            case '3': 
                tasks.listPendingCompleted( true );
                break;

            case '4': 
                tasks.listPendingCompleted( false );
                break;

            case '5': 
                const ids = await showListCheck( tasks.listArr );
                tasks.toggleCompleted( ids );
                break;
            
            case '6': 
                const id = await taskListDelete( tasks.listArr );
                if ( id !== '0' ) {
                const ok = await confirm('Are you sure of delete the task?');
                    if ( ok ) {
                        tasks.deleteTask( id );
                        console.log(`\nTask deleted`.red);
                    }
                }
                break;
            
        }
        saveDb( tasks.listArr );
        await pause();
    } while(opt !== '0')




}

main();
