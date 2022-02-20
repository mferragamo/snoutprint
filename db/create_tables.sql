CREATE TABLE persons (
    PersonId SERIAL PRIMARY KEY NOT NULL,  
    FirstName TEXT,
    LastName TEXT,
    EmailAddress TEXT,
    CreatedDate DATE NOT NULL DEFAULT NOW(),
    Deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE pets (
    PetId SERIAL PRIMARY KEY NOT NULL,  
    Name TEXT,
    Species TEXT,
    Breed TEXT,
    Sex CHAR(1),
    BirthDate DATE,
    CreatedDate DATE NOT NULL DEFAULT NOW(),
    Deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE records (
    RecordId SERIAL PRIMARY KEY NOT NULL,  
    Title TEXT,
    Url TEXT,
    PetId INT NOT NULL,
    CreatedDate DATE NOT NULL DEFAULT NOW(),
    Deleted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FK_Pet FOREIGN KEY (PetId) REFERENCES pets(PetId)
);

CREATE TABLE persons_pets (
    PersonsPetsId SERIAL PRIMARY KEY NOT NULL, 
    PersonId INT NOT NULL,
    PetId INT NOT NULL,
    CONSTRAINT FK_Person FOREIGN KEY (PersonId) REFERENCES persons(PersonId),
    CONSTRAINT FK_Pet FOREIGN KEY (PetId) REFERENCES pets(PetId)
);