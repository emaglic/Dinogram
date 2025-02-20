const constrainText = (text: string, maxLength: number = 18) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

export default constrainText;
