import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

export default async function getAll(){
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );
    return data;
};