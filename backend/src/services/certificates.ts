import { CreateCertificateDTO, UpdateCertificateDTO } from "../types/types";
import prisma from "../config/prisma";
import { certificateSchema } from "../schemas/certificates";
import { Certificate } from "@prisma/client";

class CertificateService {
  async getAll(): Promise<Certificate[]> {
    return prisma.certificate.findMany();
  }

  async getById(id: number): Promise<Certificate> {
    const certificate = await prisma.certificate.findUnique({
      where: { id }
    })

    if (!certificate) {
      throw new Error(`Certificate with ID ${id} not found`)
    }

    return certificate;
  }

  async create(data: CreateCertificateDTO): Promise<Certificate> {
    const validatedData = certificateSchema.parse(data);

    return prisma.certificate.create({
      data: validatedData,
    })
  }

  async update(id: number, data: UpdateCertificateDTO): Promise<Certificate> {
    const validatedData = certificateSchema.partial().safeParse(data);

    try {
      return await prisma.certificate.update({
        where: { id },
        data: validatedData
      })
    } catch (error) {
      throw new Error(`Certificate with ID ${id} not found`)
    }
  }

  async delete(id: number): Promise<Certificate> {
    try {
      return await prisma.certificate.delete({
        where: {id}
      })
    } catch (error) {
      throw new Error(`Certificate with ID ${id} not found`)
    }
  }
}

const certificateService = new CertificateService();
export default certificateService