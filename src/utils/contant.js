export const LOGIN_DATA = [{
    ID: 0,
    NAME: "email",
    LABEL: "Email",
    RMESSAGE: "Please  Enter the Email",
    REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    RXMESSAGE: "Please enter a valid email",
  
},
{
    ID: 1,
    NAME: "password",
    LABEL: "Password",
    RMESSAGE: "Please  Enter the Password",
    REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    RXMESSAGE:
      "Password should be of at least  8 characters, one capital letter, and one number. and one special character.",
  
}
]