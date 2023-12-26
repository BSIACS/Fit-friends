import { IsString, IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
;

export class UpdateTrainersCertificateDto {
  @IsUUID()
  id: UUID;

  @IsString()
  updatedCertificateName: string;
}
