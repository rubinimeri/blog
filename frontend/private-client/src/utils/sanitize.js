import DOMPurify from "dompurify";

const sanitizeField = (input) => DOMPurify.sanitize(input);

export default sanitizeField;
