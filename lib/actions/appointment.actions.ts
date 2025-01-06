import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, PATIENT_COLLECTION_ID,  } from "../appwrite.config"
import { ID } from "node-appwrite"

export const createAppointment = async () {
    try {
        const newPatient = await databasesses.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(), 
            {
              identificationDocumentId: file?.$id || null,
              identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
              ...patient
            }
    
          )
          return parseStringify(newPatient)
    } catch (error) {
        console.log(error)
    }
}