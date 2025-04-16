import { SESClient } from "@aws-sdk/client-ses";

export const ses = new SESClient({
	region: process.env.SES_AWS_REGION!,
	credentials: {
		accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY!,
	},
});
