import * as bcrypt from "bcrypt";


const salt_rounds = 10;


export async function criptografar(string) {
	return bcrypt.hash(string, salt_rounds);
}


export async function comparar(string, hash) {
	return bcrypt.compare(string, hash);
}