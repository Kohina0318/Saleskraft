import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Beatdump.db' });



const createProductCategoryTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });
  try {
    // SELECT name FROM sqlite_master WHERE type='table' AND name='Products';
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='Product_category'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {
            await txn.executeSql(`DROP TABLE IF EXISTS Product_category`, []);

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS Product_category(Id INTEGER (15), CategoryName VARCHAR(120), CategoryType VARCHAR(120),CategoryDescription VARCHAR(400), CategoryMedia TEXT,CategoryDisplayOrder INT(15),CategoryParentId INT(15),AdditionalData VARCHAR(500),CompanyId INT(15),CreatedAt VARCHAR(350),UpdatedAt VARCHAR(350));`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Product_category table creation
    });
    // alert('SQLite Database and Table Product Category Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const creatProductsTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='Products'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {
            await txn.executeSql(
              'DROP TABLE IF EXISTS Products',
              [],
              (err, result) => {
              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS Products(Id INTEGER(15),ProductName VARCHAR(120),ProductImages VARCHAR(250),ProductSummary VARCHAR(400),ProductDescription VARCHAR(400),ProductSku VARCHAR(30),AdditionalData VARCHAR(400), UnitD INT(15),PackingDesc VARCHAR(200),PackingQty INT(15),CompanyId INT(15) ,CategoryId INT(15),CreatedAt VARCHAR(350),UpdatedAt VARCHAR(350),Categories VARCHAR(20))`,
              [],
              (err, result) => {
              },
            );
          }
        },
      ); //End of Products table creation
    });
    // alert('SQLite Database and Table Products Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const createOutletsTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='Outlets'`,
        [],
        async function (tx, res) {
          if (res.rows.length == 0) {
            await txn.executeSql(
              'DROP TABLE IF EXISTS Outlets',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS Outlets(Id INTEGER(15),OutletName VARCHAR(120),OutletCode VARCHAR(400),OutletEmail VARCHAR(400),OutletSalutation VARCHAR(30),OutletClassification VARCHAR(400),OutletOpeningDate VARCHAR(400) ,OutletContactName VARCHAR(400),OutletLandlineno VARCHAR(400),OutletContactBday VARCHAR(400),OutletContactAnniversary VARCHAR(400),OutletIsdCode VARCHAR(20),OutletContactNo VARCHAR(20),OutletAltContactNo VARCHAR(20),OutletStatus VARCHAR(25),OutletAddress VARCHAR(400),OutletStreetName VARCHAR(400),OutletCity VARCHAR(400),OutletState VARCHAR(400),OutletCountry VARCHAR(400),OutletCounty VARCHAR(400),OutletPincode VARCHAR(20),OutletGps VARCHAR(20),TerritoryId  INT(15),OutlettypeId INT(15),CompanyId INT(15),CreatedAt VARCHAR(350),UpdatedAt VARCHAR(350),OutletOtp VARCHAR(200),OutletVerified VARCHAR(200),OutletCreatedBy VARCHAR(200),OutletApprovedBy VARCHAR(200),BeatStatus VARCHAR(100),InsertedFor VARCHAR(100))`,
              [],
              (err, result) => {
              },
            );
          }
        },
      ); //End of Products table creation
    });
    // alert('SQLite Database and Table Products Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const createMappingTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='Mapping'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS Mapping',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS Mapping(MappingId INTEGER(15),PrimaryOutletId INT(15),SecondaryOutletId INT(15),PricebookId VARCHAR(120),CategoryType VARCHAR(120),Isdefault INT(15))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Products table creation
    });
    // alert('SQLite Database and Table Products Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const createPrimaryOutletsTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='PrimaryOutlets'`,
        [],
        async function (tx, res) {
          console.log('tx----- In CreateTable Line 129', tx);

          // alert('PrimaryOutlets' + res.rows.length);
          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS PrimaryOutlets',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS PrimaryOutlets(Id INTEGER(15),OutletName VARCHAR(120),OutletCode VARCHAR(400),OutletEmail VARCHAR(400),OutletSalutation VARCHAR(30),OutletClassification VARCHAR(400),OutletOpeningDate VARCHAR(400) ,OutletContactName VARCHAR(400),OutletLandlineno VARCHAR(400),OutletContactBday VARCHAR(400),OutletContactAnniversary VARCHAR(400),OutletIsdCode VARCHAR(20),OutletContactNo VARCHAR(20),OutletAltContactNo VARCHAR(20),OutletStatus VARCHAR(25),OutletAddress VARCHAR(400),OutletStreetName VARCHAR(400),OutletCity VARCHAR(400),OutletState VARCHAR(400),OutletCountry VARCHAR(400),OutletCounty VARCHAR(400),OutletPincode VARCHAR(20),OutletGps VARCHAR(20),TerritoryId  INT(15),OutlettypeId INT(15),CompanyId INT(15),CreatedAt VARCHAR(350),UpdatedAt VARCHAR(350),OutletOtp VARCHAR(200),OutletVerified VARCHAR(200),OutletCreatedBy VARCHAR(200),OutletApprovedBy VARCHAR(200))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Products table creation
    });
    // alert('SQLite Database and Table PrimaryOutlets Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const createOutletsTypesTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });
  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='OutletsTypes'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS OutletsTypes',
              [],
              (err, result) => {

              },
            );


            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS OutletsTypes(OutlettypeId INTEGER(15),CompanyId INT(15),OutlettypeName VARCHAR(400),Isoutletprimary INT(15),Isoutletendcustomer INT(15),Isenabled INT(15),Outletparent INT(15),ImageMediaId INT(15))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Products table creation
    });
    // alert('SQLite Database and Table PrimaryOutlets Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const createPriceBookTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });
  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='PriceBooks'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {
            console.log('>>>>>>>>here47');
            await txn.executeSql(
              'DROP TABLE IF EXISTS PriceBooks',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS PriceBooks(Id INTEGER(15),PricebookId INT(15),ProductId INT(15),MaxRetailPrice VARCHAR(200),SellingPrice VARCHAR(200),AdditionalRemark VARCHAR(400),Isenabled INT(15),CompanyId INT(15),CreatedAt VARCHAR(350),UpdatedAt VARCHAR(350),PriceBookName VARCHAR(400))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of PriceBooks table creation
    });
    // alert('SQLite Database and Table PrimaryOutlets Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const createUnitsTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });
  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='Units'`,
        [],
        async function (tx, res) {



          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS Units',
              [],
              (err, result) => {
                console.log('err Line 135', err);
                console.log('result Line 136', result);
              },
            );
            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS Units(UnitId INTEGER(15),UnitCode VARCHAR(400),UnitDescription VARCHAR(400))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Units table creation
    });
    // alert('SQLite Database and Table PrimaryOutlets Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const creatCheckinCheckoutTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='CheckinCheckout'`,
        [],
        async function (tx, res) {
          if (res.rows.length == 0) {
            console.log('>>>>>>>>here47');
            await txn.executeSql(
              'DROP TABLE IF EXISTS CheckinCheckout',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS CheckinCheckout(Id INTEGER PRIMARY KEY AUTOINCREMENT,OutletId INTEGER(15), Checkin_Lat VARCHAR(50),Checkin_Lng VARCHAR (50),Checkout_Lat VARCHAR(50),Checkout_Lng VARCHAR (50),StartTime VARCHAR (50), EndTime VARCHAR (50), MeetingEndNotes VARCHAR (400), Remark VARCHAR (400),isBeatStart VARCHAR (20),isBeatEnd VARCHAR (20),chekin_address VARCHAR (800),chekout_address VARCHAR (800),OutletName VARCHAR (800),SyncFlag INTEGER DEFAULT 0,ErrorMSG TEXT,BeatId VARCHAR (200), checkout_outcome_id VARCHAR (200), checkout_media VARCHAR (200),roasterId VARCHAR (200),chekin_checkout_id VARCHAR (200))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Products table creation
    });
    // alert('SQLite Database and Table Products Successfully Created...');
  } catch (e) {
    alert(e);
  }
};


const createStockTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='Stock'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS Stock',
              [],
              (err, result) => {

              },
            );


            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS Stock(OutletStockId VARCHAR(200), OutletId INTEGER(200),ProductId INTEGER(200),FreeQty INTEGER(200),ReservedQty INTEGER(200),BsdQty INTEGER(20), CompanyId INTEGER(50), LastSync VARCHAR (400))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Stock table creation
    });
    // alert('SQLite Database and Table Stock Successfully Created...');
  } catch (e) {
    alert(e);
  }
};


const createSalesOrderTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='SalesOrder'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS Stock',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS SalesOrder(OrderId INTEGER PRIMARY KEY AUTOINCREMENT, EmployeeId INTEGER(20),ShipFrom INTEGER(20),ShipTo INTEGER(20),CreatedDate VARCHAR (400),SubTotal VARCHAR(20),PTR_margin VARCHAR(20),Total VARCHAR(20), OutletId INTEGER(20),SyncFlag INTEGER DEFAULT 0,ErrorMSG TEXT,chekin_checkout_id VARCHAR(500),ShipToName VARCHAR(500),ShipFromName VARCHAR(500))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Stock table creation
    });
    // alert('SQLite Database and Table Stock Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const createSalesOrderLineItemTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='SalesOrderLineItem'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS SalesOrderLineItem',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS SalesOrderLineItem(SOLI_Id INTEGER PRIMARY KEY AUTOINCREMENT, ProductId INTEGER(20),CategoryId INTEGER(20),ProductName VARCHAR (400),ProductSku VARCHAR (400), MRP VARCHAR (400),PTR VARCHAR (400),Quantity VARCHAR (400),CreatedDate VARCHAR (400),SalesOrderId INTEGER(20),SyncFlag INTEGER DEFAULT 0,ErrorMSG TEXT)`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Stock table creation
    });
    // alert('SQLite Database and Table Stock Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

const createBeatTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='Beat'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS Beat',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS Beat(OutletId VARCHAR(100),visitStatus VARCHAR (50))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Stock table creation
    });
    // alert('SQLite Database and Table Stock Successfully Created...');
  } catch (e) {
    alert(e);
  }
};


const createOutcomeTable = async () => {
  var db = openDatabase({ name: 'Beatdump.db' });

  try {
    db.transaction(async function (txn) {
      await txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='Outcome'`,
        [],
        async function (tx, res) {

          if (res.rows.length == 0) {

            await txn.executeSql(
              'DROP TABLE IF EXISTS Outcome',
              [],
              (err, result) => {

              },
            );

            await txn.executeSql(
              `CREATE TABLE IF NOT EXISTS Outcome(Id VARCHAR(100),OutcomeName VARCHAR (400),OutcomeFactor VARCHAR (50),CompanyId VARCHAR (50))`,
              [],
              (err, result) => {

              },
            );
          }
        },
      ); //End of Stock table creation
    });
    // alert('SQLite Database and Table Stock Successfully Created...');
  } catch (e) {
    alert(e);
  }
};

export {
  createProductCategoryTable,
  creatProductsTable,
  createOutletsTable,
  createMappingTable,
  createPrimaryOutletsTable,
  createPriceBookTable,
  createOutletsTypesTable,
  createUnitsTable,
  creatCheckinCheckoutTable,
  createStockTable,
  createSalesOrderTable,
  createSalesOrderLineItemTable,
  createBeatTable,
  createOutcomeTable,
  db,
};