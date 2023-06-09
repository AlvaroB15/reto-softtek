import { APIGatewayEvent, Handler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getPlanetSwapi } from "@libs/swapi/getPlanet";

const getPlanet: Handler = async (event: APIGatewayEvent) => {
    try {
        const response = await getPlanetSwapi(event.queryStringParameters.lan);

        return formatJSONResponse(
            {
                message: "Planet Found",
                data: response,
                status: 200
            }
        );
    } catch (error) {
        return formatJSONResponse(
            {
                error: error.message,
                status: 400
            }
        );
    }
};

export const main = middyfy(getPlanet);
