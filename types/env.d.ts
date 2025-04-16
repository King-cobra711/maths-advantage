declare namespace NodeJS {
	interface ProcessEnv {
		AWS_ACCESS_KEY_ID: string;
		AWS_SECRET_ACCESS_KEY: string;
		AWS_REGION: string;
		SES_VERIFIED_EMAIL: string;
		CONTACT_EMAIL: string;
	}
}
