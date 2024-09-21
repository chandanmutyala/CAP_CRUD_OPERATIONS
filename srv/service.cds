using com.cy.crud as mock from '../db/schema';

service Crud {
    entity Products as projection on mock.Products;
}