import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz.")
    .required("Zorunlu alan"),
  password: yup
    .string()
    .min(6, "Parolanız en az 5 karakter olmalıdır.")
    .required("Zorunlu alan"),
});

export default validations;
