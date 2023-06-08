const supplierRepository = require("../repositories/supplierRepository");

class supplierService {
    static async handleCreateSupplier({
        userId,
        supplierName,
        contact,
        address,
        description
    }) {
        try {

            if (!supplierName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nama supplier wajib diisi.",
                    data: {
                        createdSupplier: null,
                    },
                };
            }
            if (!contact) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Kontak wajib diisi.",
                    data: {
                        createdSupplier: null,
                    },
                };
            }
            if (!address) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Alamat wajib diisi.",
                    data: {
                        createdSupplier: null,
                    },
                };
            }
            if (!description) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Deskripsi wajib diisi.",
                    data: {
                        createdSupplier: null,
                    },
                };
            }
            // ------------------------- End Payload Validation ------------------------- //

            const createdSupplier = await supplierRepository.handleCreateSupplier({
                userId,
                supplierName,
                contact,
                address,
                description
            });

            return {
                status: true,
                statusCode: 201,
                message: "Berhasil membuat Supplier!",
                data: {
                    createdSupplier: createdSupplier,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    createdSupplier: null,
                },
            };
        }
    }

    static async handleUpdateSupplier({
        id,
        userId,
        supplierName,
        contact,
        address,
        description
    }) {
        try {
            const getSupplierById = await supplierRepository.handleGetSupplierById({
                id
            });

            if (getSupplierById.userId == userId) {

                if (!supplierName) {
                    supplierName = getSupplierById.supplierName
                }
                if (!contact) {
                    contact = getSupplierById.contact
                }
                if (!address) {
                    address = getSupplierById.address
                }
                if (!description) {
                    description = getSupplierById.description
                }

                const updatedSupplier = await supplierRepository.handleUpdateSupplier({
                    id,
                    supplierName,
                    contact,
                    address,
                    description
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Supplier berhasil di perbarui!",
                    data: {
                        updatedSupplier: updatedSupplier,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai",
                    data: {
                        updatedSupplier: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    updatedSupplier: null,
                },
            };
        }
    };

    static async handleDeleteSupplier({
        id,
        userId,
    }) {
        try {
            const getSupplierById = await supplierRepository.handleGetSupplierById({
                id
            });

            if (getSupplierById.userId == userId) {
                const handleDeleteSupplier = await supplierRepository.handleDeleteSupplier({
                    id
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Supplier berhasil dihapus!",
                    data: {
                        deleteSupplier: handleDeleteSupplier,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai.",
                    data: {
                        deleteSupplier: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    deleteSupplier: null,
                },
            };
        }
    };

    static async handleGetSupplierById({
        id,
    }) {
        try {
            const getSupplierById = await supplierRepository.handleGetSupplierById({
                id,
            });
            return {
                status: true,
                statusCode: 200,
                message: "Supplier berhasil ditampilkan",
                data: {
                    getSupplierById: getSupplierById,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    getSupplierById: null,
                },
            };
        }
    };

    static async handleGetAllSupplier() {
        try {
            const handleGetAllSupplier = await supplierRepository.handleGetAllSupplier();

            return {
                status: true,
                statusCode: 200,
                message: "Supplier berhasil ditampilkan",
                data: {
                    getAllSupplier: handleGetAllSupplier,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    getAllSupplier: null,
                },
            };
        }
    }
}

module.exports = supplierService