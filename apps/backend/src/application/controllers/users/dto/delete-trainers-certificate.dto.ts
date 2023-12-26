import { IsString, IsUUID } from 'class-validator';
import { UUID } from '../../../../types/uuid.type';
;

export class DeleteTrainersCertificateDto {
  @IsUUID()
  id: UUID;

  @IsString()
  deletedCertificateName: string;
}
