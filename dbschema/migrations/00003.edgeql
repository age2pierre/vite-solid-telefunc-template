CREATE MIGRATION m1c5gh5gycbidcsvuqrxrri76xg6tramhymbzsit5squr2nzvea6wq
    ONTO m1wgzd66pyeh5t4buqi5kqeswpyzbg37k4fi62oqd77obidshviroq
{
  ALTER TYPE default::AuthLocal {
      ALTER PROPERTY email {
          RENAME TO username;
      };
  };
};
