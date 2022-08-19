// Imports
import records from './database.js' 

// Model 
const dbStructure = {};
bdStructure.table = 'Modules';
bdStructure.idField = 'ModuleID'
bdStructure.mutableFields = [
    'ModuleName', 'ModuleCode', 'ModuleLevel','ModuleYearID','ModuleLeaderID','ModuleImageURL'
]
bdStructure.fields = [bdStructure.idField, ...bdStructure.mutableFields];
dbStructure.extendedTable = `((${dbStructure.table} LEFT JOIN Years ON Modules.ModuleYearID=Years.YearID) LEFT JOIN Users ON Modules.ModuleLeaderID=Users.UserID)`;

dbStructure.extendedFields = `${bdStructure.fields}, Years.YearName AS ModuleYearName, CONCAT(Users.UserFirstname, ' ', Users.UserLastname) AS ModuleLeaderName`;
// Conformance
const dbConformance = {};
dbConformance.recordToObject = (record) => record;
dbConformance.objToRecord = (obj) => dbStructure.mutableFields.reduce((prevRecord, currField) => { 
 if(object.keys(obj).includes(currField)) prevRecord[currField] = obj[currField];
 return prevRecord;
}, {});


export default { dbConn, dbStructure, mutableKeys }
