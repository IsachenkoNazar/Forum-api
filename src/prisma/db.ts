import 'dotenv/config';
import postgres, { type PostgresClient } from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };
import { contractFromJson } from '@prisma/orm-postgres/static';

export const db = postgres<Contract>({
  contract: contractJson as unknown as Contract,
  url: process.env['DATABASE_URL']!,
});

export type Database = PostgresClient<Contract>

const contract = contractFromJson<Contract>(contractJson)


export function createDb(url: string): Database {
	return postgres({
		contract,
		url,
	});
}

