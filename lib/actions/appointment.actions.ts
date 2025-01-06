import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID,  } from "../appwrite.config"
import { ID } from "node-appwrite"
import { parseStringify } from "../utils"

export const createAppointment = async (appointment: CreateAppointmentParams) {
    try {
        const newAppointment = await databasesses.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment,
            {
              ...patient
            }
    
          )
          return parseStringify(newAppointment)
    } catch (error) {
        console.log(error)
    }
}