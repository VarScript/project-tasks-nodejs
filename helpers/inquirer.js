const inquirer = require('inquirer');
require('colors');



const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What want make?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Create task`
            },
            {
                value: '2',
                name: `${ '2.'.green } List task`
            },
            {
                value: '3',
                name: `${ '3.'.green } List completed task`
            },
            {
                value: '4',
                name: `${ '4.'.green } List pending task`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completed task`
            },
            {
                value: '6',
                name: `${ '6.'.green } Delete task`
            },
            {
                value: '0',
                name: `${ '0.'.green } Exit`
            },
            
        ]
    }
];



const inquirerMenu = async () => {
    console.clear();
    console.log('========================'.green);
    console.log('    Select an option    '.green);
    console.log('========================\n'.green);
    // destructuring the option because come the option in object and we need only value
    const { option } = await inquirer.prompt(questions);
    return option;
}



const pause = async () => {
    const stop = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue\n`
        }
    ];
    console.log('\n');
    await inquirer.prompt(stop);
}



const readInput = async ( message ) => {
    const question = [ 
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Please you enter a value';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}



const taskListDelete = async ( task = [] ) => {
    // .Map return new array but the values of the array the transform in the that i wanna
    const choices = task.map( ( task, i ) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]
    const { id } = await inquirer.prompt(questions);
    return id;
}


const confirm = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}


const showListCheck = async ( task = [] ) => {
    const choices = task.map( ( task, i ) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`,
            checked: ( task.completedIn ) ? true : false
        }
    });
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Delete',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(question);
    return ids;
}







module.exports = {
    inquirerMenu,
    pause,
    readInput,
    taskListDelete,
    confirm,
    showListCheck
}
