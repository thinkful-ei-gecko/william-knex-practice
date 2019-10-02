const ShoppingListServices = {

  getAllShoppingListItems(db) {
    return db
      .select('*')
      .from('shopping_list');
  },

  insertShoppingListItem(db,newItem) {
    return db
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(data => data[0]); // data is an array containing the one object we created. data[0] is just giving us back that one object
  },

  getItemById(db,id) {
    return db
      .select('*')
      .from('shopping_list')
      .where( {id} ) // .where('id', id)  ===>  where 'id' = id ... this is string format, but typically we see object format as well
      .first(); //first() returns the first object within the array. Without the first() it would return an array with length of 1
  },

  updateShoppingListItem(db,id,newItemFields) {
    return db
      .from('shopping_list')
      .where( {id: id} )
      .update(newItemFields);
  },

  deleteShoppingListItem(db,id) {
    return db
      .from('shopping_list')
      .where( {id: id} )
      .delete();
  }
};

module.exports = ShoppingListServices;