import { z } from "zod";
import { certificateSchema } from "../schemas/certificates";

export interface CreateCertificateDTO extends z.infer<typeof certificateSchema> {}

export interface UpdateCertificateDTO
  extends Partial<CreateCertificateDTO> {}
