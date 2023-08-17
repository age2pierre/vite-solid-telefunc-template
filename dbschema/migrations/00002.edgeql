CREATE MIGRATION m1wgzd66pyeh5t4buqi5kqeswpyzbg37k4fi62oqd77obidshviroq
    ONTO m13ect7mfjecrbpo2igxxf4obhdzkpmzca2qzkawfq2wurljmyooka
{
  CREATE TYPE default::AuthLocal {
      CREATE REQUIRED PROPERTY email: std::str {
          SET readonly := true;
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY password: std::str;
  };
  ALTER TYPE default::Todo {
      CREATE LINK list: default::TodoList;
      ALTER PROPERTY done {
          SET default := false;
      };
  };
  ALTER TYPE default::TodoList {
      ALTER LINK todos {
          USING (.<list[IS default::Todo]);
      };
  };
};
