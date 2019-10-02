require('dotenv').config();
const knex = require('knex');
const ShoppingListServices = require('./shopping-list-service');

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

// ShoppingListServices.getAllShoppingListItems(db)
//   .then(result => console.log(result))
//   .then(() => {
//     ShoppingListServices.insertShoppingListItem(db, {
//       name: 'Test item',
//       price: 10.99,
//       category: 'Main'
//     });
//   })
//   .then(newItem => {
//     console.log(newItem);
//     return ShoppingListServices.updateShoppingListItem(
//       db,
//       newItem.id,
//       {name: 'New Test Item'}
//     )
//       .then(() => ShoppingListServices.getById(db,newItem.id));
//   })
//   .then(item => {
//     console.log(item);
//     return ShoppingListServices.deleteShoppingListItem(db, item.id);
//   });

ShoppingListServices.getItemById(db,2)
  .then(result => console.log(result));

// console.log(ShoppingListServices.getAllShoppingListItems(db));