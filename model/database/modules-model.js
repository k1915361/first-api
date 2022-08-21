// Imports
import dbConn from './database.js' 

// Model 
const dbStructure = {};
dbStructure.table = 'Modules';
dbStructure.idField = 'ModuleID';
dbStructure.mutableFields = [
    'ModuleName', 'ModuleCode', 'ModuleLevel','ModuleYearID','ModuleLeaderID','ModuleImageURL'
];
dbStructure.fields = [dbStructure.idField, ...dbStructure.mutableFields];
dbStructure.extendedTable = `((${dbStructure.table} LEFT JOIN Years ON Modules.ModuleYearID=Years.YearID) LEFT JOIN Users ON Modules.ModuleLeaderID=Users.UserID)`;
dbStructure.extendedFields = `${dbStructure.fields}, Years.YearName AS ModuleYearName, CONCAT(Users.UserFirstname, ' ', Users.UserLastname) AS ModuleLeaderName`;
// Conformance
const dbConformance = {};
dbConformance.recordToObject = (record) => record;
dbConformance.objToRecord = (obj) => dbStructure.mutableFields.reduce((prevRecord, currField) => { 
 if(object.keys(obj).includes(currField)) prevRecord[currField] = obj[currField];
 return prevRecord;
}, {});

export default { dbConn, dbStructure, dbConformance }