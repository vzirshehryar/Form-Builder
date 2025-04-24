import React from "react";

const ErrorText = ({ text }: { text: string }) => {
  return <p className="text-red-400 text-sm">{text}</p>;
};

export default ErrorText;
