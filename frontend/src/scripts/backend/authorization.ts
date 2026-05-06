import axios from "axios";
import { API_REGISTER } from "../../constants/api";
import { RegisterData } from "../../shared/auth/types";


export const registerRequest = async (data: RegisterData) =>
    axios.post(API_REGISTER, data);
