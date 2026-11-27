
function required(name: string){
    const value = process.env[name]

    if(!value){
        throw new Error(`${name} doesn't exist`)
    }

    return value
}

function optionalInt(name: string, fallback: number){
    const raw = process.env[name]
    
    if(raw === undefined || raw === ""){
        return fallback
    }
    
    const value = Number(raw)
    
    if(value <= 0 || !Number.isSafeInteger(value)){
        throw new Error(`${name} must be positive integer`)
    }
    return value
}

export function createConfig(): Config{
    return{
        databaseUrlSecret: required("DATABASE_URL"),
        passwordPepperSecret: Buffer.from(required("PASSWORD_PEPPER"), "hex"),
        accessTokenSecret: required("JWT_ACCESS_SECRET"),
        refreshTokenSecret: required("JWT_REFRESH_SECRET"),
        corsOrigin: required("CORS_ORIGIN"),
        serverPortSecret: optionalInt("SERVER_PORT", 8000)
    }

}

export interface Config {
	databaseUrlSecret: string,
	passwordPepperSecret: Buffer,
	accessTokenSecret: string,
	refreshTokenSecret: string,
	corsOrigin: string,
	serverPortSecret: number,
}