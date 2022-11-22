const URL_REGEX = /^(https?:\/\/)([da-z.-]+).([a-z.]{2,6})([/\w_.#-]*)*$/;
const PHONE_REGEX = /^\d{3,4}-?\d{3,4}-?\d{4}$/;
const EMAIL_REGEX =
  /^[\da-zA-Z]([-_.]?[\da-zA-Z])*@[0-9a-zA-Z]([-_.]?[\da-zA-Z])*.[a-zA-Z]{2,3}$/i;

export { URL_REGEX, PHONE_REGEX, EMAIL_REGEX };
