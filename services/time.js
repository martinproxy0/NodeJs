const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM time LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(timeEntry) {
    const result = await db.query(
        `INSERT INTO time (userid, machine, status) 
      VALUES 
      ('${timeEntry.userid}', '${timeEntry.machine}', '${timeEntry.status}')`
    );

    let message = 'Error in creating time ntry';

    if (result.affectedRows) {
        message = 'Time entry created successfully';
    }

    return { message };
}

async function update(id, timeEntry) {
    const result = await db.query(
        `UPDATE time 
      SET userid="${timeEntry.userid}", machine=${timeEntry.machine}, status=${timeEntry.status} 
      WHERE timeid=${id}`
    );

    let message = 'Error in updating time entry';

    if (result.affectedRows) {
        message = 'Time entry updated successfully';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM time WHERE timeid=${id}`
    );

    let message = 'Error in deleting time entry';

    if (result.affectedRows) {
        message = 'Time entry deleted successfully';
    }

    return { message };
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}