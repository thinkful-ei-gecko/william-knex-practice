require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

// function getAllItemsThatContainText(searchTerm) {
//   knexInstance
//     .select('*')
//     .from('shopping_list')
//     .where('name', 'ilike', `%${searchTerm}%`)
//     .then(result => {
//       console.log(result);
//     });
// }

// getAllItemsThatContainText('fish');


// function getAllItemsPaginated(pageNumber) {
//   const itemsPerPage = 6;
//   const offset = itemsPerPage * (pageNumber - 1);
//   knexInstance
//     .select('*')
//     .from('shopping_list')
//     .limit(itemsPerPage)
//     .offset(offset)
//     .then(result => {
//       console.log(result);
//     });
// }

// getAllItemsPaginated(6);


// function getAllItemsAddedAfterDate(daysAgo) {
//   knexInstance
//     .select('*')
//     .from('shopping_list')
//     .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
//     .then(result => {
//       console.log(result);
//     });
// }

// getAllItemsAddedAfterDate(10);


function totalCostPerCategory() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .sum('price AS Total Cost')
    .groupBy('category')
    .orderBy([{column: 'Total Cost', order: 'ASC'}])
    .then(result => {
      console.log(result);
    });
}

totalCostPerCategory();