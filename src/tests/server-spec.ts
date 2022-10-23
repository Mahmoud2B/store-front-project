import { types } from 'pg';
//This is to parse numbers that comes from pg
types.setTypeParser(1700, function (val: string) {
    return parseFloat(val);
});