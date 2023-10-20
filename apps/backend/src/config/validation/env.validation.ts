import {IsNumber, IsString, Max, Min, validateSync} from 'class-validator';
import { EnvValidationMessage } from './env-validation-messages';
import { plainToInstance } from 'class-transformer';

const MIN_PORT = 0;
const MAX_PORT = 65535;

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired
  })
  public DB_NAME: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired
  })
  public DB_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.DBPortRequired
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public DB_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired
  })
  public DB_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired
  })
  public DB_PASSWORD: string;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(
    EnvironmentsConfig,
    config,
    { enableImplicitConversion: true  },
  );

  const errors = validateSync(
    environmentsConfig, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
