const { users } = require('../models')

class authRepository {
        // ------------------------- Get Admin By Email  ------------------------- //

        static async getUsersByEmail({ email }) {

            const getAdmin = await users.findOne({
                where: {
                    email: email
                }
            });
    
            return getAdmin;
        };
    
        // ------------------------- End Get Admin By Email  ------------------------- //

        static async handleRegister({ email, password, role }) {

            const handleRegisterAdmin = users.create({
                email,
                password,
                role,
            });
    
            return handleRegisterAdmin;
    
        }
    
        // ------------------------- End Auth Handle Register ------------------------- //
}

module.exports = authRepository;