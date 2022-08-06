exports.userValidator = (data) => {
    let emailRegexp = /^\w+@\w+\.[a-zA-z]+$/g;
    let match = data.email.match(emailRegexp);
    if (data.firstName && data.lastName && data.email && data.password) {
        if (data.firstName.length > 3) {
            if (data.lastName.length > 3) {
                if (data.password.length > 3) {
                    if (data.password === data.repeatPassword) {
                        if (match) {
                            return data;
                        };
                        throw { message: "Please use correct email address for registration!" };
                    };
                    throw { message: "Password and repeat password must be the same!" };
                }
                throw { message: "Please use at least 3 character long password" };
            }
            throw { message: "Please use at least 3 character long Last Name" };
        };
        throw { message: "Please use at least 3 character long First Name" };
    };
    throw { message: "Please fill all the fields correctly!" };
};
