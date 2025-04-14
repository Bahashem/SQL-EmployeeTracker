import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection';

(async () => {
	await connectToDb();
})();





