const {
    categorys
} = require("../models")

class categoryRepository {
    static async handleCreateCategory({
        userId,
        categoryName
    }) {

        const createdCategory = categorys.create({
            userId,
            categoryName
        });

        return createdCategory;
    };

    static async handleUpdateCategory({
        id,
        categoryName,
    }) {

        const updatedCategory = await categorys.update({
            categoryName
        }, {
            where: {
                id
            }
        });

        return updatedCategory;
    };

    static async handleDeletecategory({ id }) {

        const deleteCategory = await categorys.destroy({ where: { id } });

        return deleteCategory;
    
    };

    static async handleGetCategoryById({
        id
    }) {
        const getCategoryById = await categorys.findOne({
            where: {
                id
            }
        });

        return getCategoryById;
    };

    static async handleGetAllCategory() {
        const getAllCategory = await categorys.findAll();

        return getAllCategory;
    };
}

module.exports = categoryRepository;