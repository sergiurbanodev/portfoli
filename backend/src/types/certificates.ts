import { z } from "zod";
import { certificateSchema } from "../schemas/certificates";

export interface CreateCertificateDTO extends Omit<z.infer<typeof certificateSchema>, "id"> {}

export interface UpdateCertificateDTO
  extends Partial<CreateCertificateDTO> {}
