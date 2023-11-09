export enum EnvValidationMessage {
  DBHostRequired = 'Postgres host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'Postgres port is required',
  DBUserRequired = 'Postgres user is required',
  DBPasswordRequired = 'Postgres password is required',
  MailServerHostRequired =  'SMTP Server is required',
  MailServerUserNameRequired = 'SMTP Server user name is required',
  MailServerPasswordRequired = 'SMTP Server password is required',
  MailServerDefaultFromRequired = 'Default value for mail from field is required',
  MailServerPortRequired = 'SMTP Server port is required',
}
