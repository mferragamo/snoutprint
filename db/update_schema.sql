-- This is for part 3:
-- Update schema with American Kennel Club registration number and Cat Fanciers' Association registration number
CREATE TABLE registration (
    RegistrationId SERIAL PRIMARY KEY NOT NULL,  
    PetId INT UNIQUE NOT NULL,
    RegistrationOrganization TEXT,
    RegistrationNumber TEXT,
    CreatedDate DATE NOT NULL DEFAULT NOW(),
    Deleted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT FK_Pet FOREIGN KEY (PetId) REFERENCES pets(PetId)
)
