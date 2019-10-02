const ShoppingListServices = require('../src/shopping-list-service');
const knex = require('knex');

const testItems = [
  {
    id: 1,
    date_added: new Date('2029-01-22T16:28:32.615Z'),
    name: 'Test 1',
    price: '5.99',
    category: 'Main',
    checked: false
  },
  {
    id: 2,
    date_added: new Date('2029-01-22T16:28:32.615Z'),
    name: 'Test 2',
    price: '5.99',
    category: 'Main',
    checked: false
  },
  {
    id: 3,
    date_added: new Date('2029-01-22T16:28:32.615Z'),
    name: 'Test 3',
    price: '5.99',
    category: 'Main',
    checked: false
  }
];

describe('ShoppingListServices object', () => {
  let db;

  before('Setup connection to test database', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before('clear database before test', () => {
    return db('shopping_list').truncate();
  });

  afterEach('clear database after each test', () => {
    return db('shopping_list').truncate();
  });

  after('destroy connection to database', () => {
    return db.destroy();
  });

  context('Given shopping_list has data', () => {

    beforeEach('Insert test data in shopping_list', () => {
      return db('shopping_list').insert(testItems);
    });

    it('returns an array of items when data is present', () => {
        return ShoppingListServices.getAllShoppingListItems(db)
        .then(res => {
          expect(res).to.be.an('array');
          expect(res).to.have.lengthOf(3);
          expect(res[0]).to.be.an('object');
          expect(res[0]).to.have.all.keys('id', 'name', 'price', 'date_added', 'checked', 'category');
          expect(res[0].name).to.eql('Test 1');
        });
    });

    it('returns the item object when given the item id', () => {
      const id = 2;
      return ShoppingListServices.getItemById(db,id)
        .then(res => {
          expect(res).to.be.an('object');
          expect(res).to.have.all.keys('id', 'date_added', 'name', 'category', 'price', 'checked');
          expect(res.id).to.eql(id);
          expect(res.name).to.eql('Test 2');
        });
    });

    it('deletes an item from the database', () => {
      const idToDelete = 2;
      return ShoppingListServices.deleteShoppingListItem(db,idToDelete)
        .then(() => ShoppingListServices.getAllShoppingListItems(db))
        .then(allItems => {
          expect(allItems).to.have.lengthOf(2);
          const expected = testItems.filter(item => item.id !== idToDelete)
          expect(allItems).to.eql(expected);
          expect(allItems).to.be.an('array');
        });
    });

    it('updates item in the shopping list', () => {
      const idToUpdate = 2;
      const newFields = {
        name: 'Updated',
        checked: true,
        price: '10.13',
        category: 'Breakfast'
      };

      return ShoppingListServices.updateShoppingListItem(db,idToUpdate,newFields)
        .then(() => ShoppingListServices.getItemById(db,idToUpdate))
        .then(item => {
          expect(item).to.be.an('object');
          expect(item).to.have.all.keys('id', 'date_added', 'name', 'category', 'price', 'checked');
          expect(item).to.eql({id: idToUpdate, ...newFields, date_added: testItems[idToUpdate - 1].date_added})
        });
    });
  });


  context('Given shopping_list has no data', () => {

    it('returns an empty array when no data present', () => {
      return ShoppingListServices.getAllShoppingListItems(db)
        .then(res => {
          expect(res).to.be.an('array');
          expect(res).to.have.lengthOf(0);
        });
    });

    const newItem = {
      id: 1,
      date_added: new Date('1918-12-22T16:28:32.615Z'),
      name: 'New Item',
      category: 'Lunch',
      price: '80.83', 
      checked: true
    };

    it('returns an object when a new item is created', () => {
      return ShoppingListServices.insertShoppingListItem(db, newItem)
        .then(res => {
          expect(res).to.eql(newItem);
          expect(res).to.be.an('object');
          expect(res).to.have.all.keys('id', 'date_added', 'name', 'category', 'price', 'checked');
          expect(res.id).to.eql(1);
          expect(res.name).to.eql('New Item');
        });
    });
  });
});




//PRE-CONTEXT TESTS...BEFORE WE ORGANIZED THE TESTS INTO DIFFERENT CONTEXTS:

 // describe('getAllShoppingListItems()', () => {
  //   it('returns an array of items when data is present', () => {
  //     return db('shopping_list').insert(testItems)
  //       .then(() => ShoppingListServices.getAllShoppingListItems(db))
  //       .then(res => {
  //         expect(res).to.be.an('array');
  //         expect(res).to.have.lengthOf(3);
  //         expect(res[0]).to.be.an('object');
  //         expect(res[0]).to.have.all.keys('id', 'name', 'price', 'date_added', 'checked', 'category');
  //         expect(res[0].name).to.eql('Test 1');
  //       });
  //   });
  //   it('returns an empty array when no data present', () => {
  //     return ShoppingListServices.getAllShoppingListItems(db)
  //       .then(res => {
  //         expect(res).to.be.an('array');
  //         expect(res).to.have.lengthOf(0);
  //       });
  //   });
  // });


  // describe('insertShoppingListItem()', () => {
  //   const newItem = {
  //     id: 1,
  //     date_added: new Date('1918-12-22T16:28:32.615Z'),
  //     name: 'New Item',
  //     category: 'Lunch',
  //     price: '80.83', 
  //     checked: true
  //   };
  //   it('returns an object when a new item is created', () => {
  //     return ShoppingListServices.insertShoppingListItem(db, newItem)
  //       .then(res => {
  //         expect(res).to.eql(newItem);
  //         expect(res).to.be.an('object');
  //         expect(res).to.have.all.keys('id', 'date_added', 'name', 'category', 'price', 'checked');
  //         expect(res.id).to.eql(1);
  //         expect(res.name).to.eql('New Item');
  //       });
  //   });
  // });


  // describe('getItemById()', () => {
  //   it('returns the item object when given the item id', () => {
  //     const id = 2;
  //     return db('shopping_list').insert(testItems) 
  //       .then(() => ShoppingListServices.getItemById(db,id))
  //       .then(res => {
  //         expect(res).to.be.an('object');
  //         expect(res).to.have.all.keys('id', 'date_added', 'name', 'category', 'price', 'checked');
  //         expect(res.id).to.eql(id);
  //         expect(res.name).to.eql('Test 2');
  //       });
  //   });
  // });


  // describe('updateShoppingListItem()', () => {
  //   it('updates item in the shopping list', () => {
  //     const idToUpdate = 2;
  //     const newFields = {
  //       name: 'Updated',
  //       checked: true,
  //       price: '10.13',
  //       category: 'Breakfast'
  //     };

  //     return db('shopping_list').insert(testItems)
  //       .then(() => ShoppingListServices.updateShoppingListItem(db,idToUpdate,newFields)) 
  //       .then(() => ShoppingListServices.getItemById(db,idToUpdate))
  //       .then(item => {
  //         expect(item).to.be.an('object');
  //         expect(item).to.have.all.keys('id', 'date_added', 'name', 'category', 'price', 'checked');
  //         expect(item).to.eql({id: idToUpdate, ...newFields, date_added: testItems[idToUpdate - 1].date_added})
  //       });
  //   });
  // });

  // describe('deleteShoppingListItem()', () => {
  //   it('deletes an item from the database', () => {
  //     const idToDelete = 2;
  //     return db('shopping_list').insert(testItems)
  //       .then(() => ShoppingListServices.deleteShoppingListItem(db,idToDelete))
  //       .then(() => ShoppingListServices.getAllShoppingListItems(db))
  //       .then(allItems => {
  //         expect(allItems).to.have.lengthOf(2);
  //         const expected = testItems.filter(item => item.id !== idToDelete)
  //         expect(allItems).to.eql(expected);
  //         expect(allItems).to.be.an('array');
  //       });
  //   });
  // });