const authRepository = require("../repositories/authRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const");

const SALT_ROUND = 10;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
const addEmail = /[@]/g;
const dotEmail = /[.]/g;
const spacing = /[\s]/;

class authService {
    // ------------------------- Register ------------------------- //
    static async handleRegister({
        email,
        password,
        role
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const passworUppercase = password.match(upperCaseLetters);
            const passworNumbers = password.match(numbers);
            const passwordSpacing = password.match(spacing);
            const validationAddEmail = email.match(addEmail);
            const validationDotEmail = email.match(dotEmail);

            if (!email) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus diisi.",
                    data: {
                        registeredAdmin: null,
                    },
                };
            } else if (!validationAddEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus memiliki @",
                    data: {
                        registeredAdmin: null,
                    },
                };
            } else if (!validationDotEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus memiliki titik(.)",
                    data: {
                        registeredAdmin: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus diisi.",
                    data: {
                        registeredAdmin: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password minimal 8 karakter.",
                    data: {
                        registeredAdmin: null,
                    },
                };
            } else if (!passworUppercase) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus mengandung huruf besar.",
                    data: {
                        registeredAdmin: null,
                    },
                };
            } else if (!passworNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus mengandung angka.",
                    data: {
                        registeredAdmin: null,
                    },
                };
            } else if (passwordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password tidak boleh diberi spasi.",
                    data: {
                        registeredAdmin: null,
                    },
                };
            }

            if (!role) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Role harus diisi.",
                    data: {
                        registeredAdmin: null,
                    },
                };
            }

            const getUserByEmail = await authRepository.getUsersByEmail({
                email
            });

            if (getUserByEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email telah digunakan.",
                    data: {
                        registeredAdmin: null,
                    },
                };
            } else {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
                const createdAdmin = await authRepository.handleRegister({
                    email,
                    password: hashedPassword,
                    role,
                });

                return {
                    status: true,
                    statusCode: 201,
                    message: "Registrasi berhasil.",
                    data: {
                        registeredAdmin: createdAdmin,
                    },
                };
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    registeredAdmin: null,
                },
            };
        }
    };
    // ------------------------- End Register ------------------------- //

    // ------------------------- Login ------------------------- //
    static async handleLogin({
        email,
        password,
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const passworUppercase = password.match(upperCaseLetters);
            const passworNumbers = password.match(numbers);
            const passwordSpacing = password.match(spacing);

            if (!password) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus diisi",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (!passworUppercase) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (!passworNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (passwordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            }

            const getUsersByEmail = await authRepository.getUsersByEmail({
                email
            });

            if (!getUsersByEmail) {
                return {
                    status: false,
                    statusCode: 404,
                    message: "Email belum terdaftar",
                    data: {
                        loginUsers: null,
                    },
                };
            } else {
                const isPasswordMatch = await bcrypt.compare(password, getUsersByEmail.password);

                if (isPasswordMatch) {
                    const token = jwt.sign({
                            id: getUsersByEmail.id,
                            email: getUsersByEmail.email
                        },
                        JWT.SECRET, {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        statusCode: 200,
                        message: "Pengguna berhasil masuk",
                        data: {
                            token,
                        },
                    };
                } else {
                    return {
                        status: true,
                        statusCode: 400,
                        message: "Email atau Password salah",
                        data: {
                            loginUsers: null,
                        },
                    };
                }
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    loginUsers: null,
                },
            };
        }
    };
    // ------------------------- End Login ------------------------- //
}

module.exports = authService;