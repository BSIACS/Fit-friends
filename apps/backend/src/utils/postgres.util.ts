export function getPostgresDbConnectionString(user: string, password: string, host: string, port:string, name: string){
  return `postgresql://${user}:${password}@${host}:${port}/${name};`
}
