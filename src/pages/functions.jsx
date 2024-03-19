function updateMode(dataUsers) {
  try {
    const newMode = !dataUsers.mode;
    sessionStorage.setItem(
      "TrueFlavor",
      JSON.stringify({
        name: dataUsers.name,
        email: dataUsers.email,
        isSigned: dataUsers.isSigned,
        mode: newMode,
      })
    );
  } catch (error) {
    console.log("mode", error);
  }
  return "";
}

function logOutUser(mode) {
  try {
    sessionStorage.setItem(
      "TrueFlavor",
      JSON.stringify({
        name: "",
        email: "",
        isSigned: false,
        mode: mode,
      })
    );
  } catch (error) {
    console.log("Error:", error);
  }
  return "";
}

function logIn(email, mode) {
  try {
    sessionStorage.setItem(
      "TrueFlavor",
      JSON.stringify({
        name: "defaultName",
        email: email,
        mode: mode,
        isSigned: true,
      })
    );
  } catch (error) {
    console.log("error to login", error);
    return "";
  }
  return "";
}

function newUserCreated(name, mode, email) {
  try {
    sessionStorage.setItem(
      "TrueFlavor",
      JSON.stringify({
        name: name,
        email: email,
        mode: mode,
        isSigned: true,
      })
    );
  } catch (error) {
    console.log("error");
    return "";
  }
  return "";
}

function getMode() {
  try {
    return JSON.parse(sessionStorage.getItem("TrueFlavor"));
  } catch (error) {
    console.log("error");
    return "";
  }
}
export { updateMode, logOutUser, logIn, newUserCreated, getMode };
