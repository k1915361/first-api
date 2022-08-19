// Imports
import records from './database.js' 

// Model
const idKey = 'UserID'


// Model 
const dbStructure = {};
bdStructure.table = 'Users';
bdStructure.idField = 'UserID'
bdStructure.mutableKeys = [
    'UserFirstname','UserLastname','UserEmail','UserPassword','UserRegistered','UserUsertypeID', 'UserLevel','UserImageURL'
]

bdStructure.fields = [bdStructure.idField, ...bdStructure.mutableFields];
dbStructure.extendedTable = `((${dbStructure.table} LEFT JOIN Years ON Users.UserYearID=Years.YearID) LEFT JOIN Usertypes ON Users.UserUsertypeID=Usertypes.UsertypeID)`;
dbStructure.extendedFields = `${bdStructure.fields}, Years.YearName AS UserYearName, Usertypes.UsertypeName AS UserUsertypeName`;
// Conformance
const dbConformance = {};

dbConformance.recordToObject = (record) => { return {...record, UserRegistered: record.UserRegistered ? true: false};};
dbConformance.objToRecord = (obj) => dbStructure.mutableFields.reduce((prevRecord, currField) => { 
 
 if(object.keys(obj).includes(currField)) prevRecord[currField] = obj[currField];
 return prevRecord;
}, {});

export default { dbConn, dbStructure, mutableKeys }

// https://web.microsoftstream.com/video/aefda91a-ee7e-43f9-afcd-30cfd4a26018