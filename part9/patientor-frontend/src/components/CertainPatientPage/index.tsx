import { Patient, Diagnosis } from "../../types";
import { Typography} from "@mui/material";


interface Props {
    patient : Patient | undefined
    diagnoses: Diagnosis[]
  }

const CertainPatientPage = ({ patient, diagnoses }: Props) => {
    
   return(
    <div>
       <Typography component="h5" variant="h5">{patient?.name}</Typography>
       <p>ssh: {patient?.ssn}</p>
       <p>occupation: {patient?.occupation}</p>
       {patient?.entries.map(e => {
            return (
                <div >
                    <p>{e.date}{' '}{e.description}</p>
                    <ul>
                        {e.diagnosisCodes?.map(d => {
                            const diagnosis = diagnoses.find(diagnose => diagnose.code === d)?.name
                            return ( 
                            <li key={d}>{d} {diagnosis? diagnosis : undefined}</li> 
                            )
                          }
                        )}
                     </ul>
                </div>)
            }
        )}
    </div>
   )
}

export default CertainPatientPage;