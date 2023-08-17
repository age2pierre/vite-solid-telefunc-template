CREATE MIGRATION m13ect7mfjecrbpo2igxxf4obhdzkpmzca2qzkawfq2wurljmyooka
    ONTO initial
{
  CREATE TYPE default::Todo {
      CREATE PROPERTY done: std::bool;
      CREATE REQUIRED PROPERTY label: std::str;
  };
  CREATE TYPE default::TodoList {
      CREATE MULTI LINK todos: default::Todo;
  };
};
