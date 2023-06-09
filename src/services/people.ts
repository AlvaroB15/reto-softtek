import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";

const nameTable = "PeopleTable";

const ddbClient = new DynamoDBClient({region: "us-east-1"});
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const addPersonService = async (newPerson) => {

    // SDK 3
    console.log(newPerson);
    console.log(typeof newPerson);
    const params = {
        TableName: nameTable,
        Item: newPerson,
    };

    try {
        return await docClient.send(new PutCommand(params));
    } catch (err) {
        console.log("addPersonService: ", err);
        throw new Error(err);
    }

    /*
    VERSION SDK 2
        return await dynamoDb
            .put({
                TableName: nameTable,
                Item: newPerson,
            })
            .promise();
     */
};

export const getPeopleService = async () => {

    // SDK 3
    try {
        const command = new ScanCommand({
            ProjectionExpression: "#id, fechaRegistro, genero, nombre, planetaOrigen",
            ExpressionAttributeNames: {"#id": "id"},
            TableName: nameTable,
        });

        return await docClient.send(command);

    } catch (err) {
        console.log("addPersonService: ", err);
        throw new Error(err);
    }

    /*
    VERSION SDK 2
        return await dynamoDb
            .scan({
                TableName: nameTable,
            })
            .promise();
     */
};

export const getPersonService = async (id: string) => {

    // SDK 3
    try {
        console.log(id);
        const params = {
            TableName: nameTable, //TABLE_NAME
            Key: {
                id: id,
            }
        };
        const dataResponse = await docClient.send(new GetCommand(params));
        console.log({dataResponse});
        return dataResponse;

    } catch (err) {
        console.log("getPersonService: ", err);
        throw new Error(err);
    }
    /*
    VERSION SDK 2
        return await dynamoDb
            .get({
                TableName: "PeopleTable",
                Key: { id },
            })
            .promise();
     */
};
