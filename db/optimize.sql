-- This is for part 4:
-- Optimize loading a person's list of pets


-- I would begin optimization by asking Postgresql to explain an example query:
EXPLAIN SELECT pets.PetId, pets.Name, pets.Species, pets.Breed, pets.Sex,
            pets.Birthdate, pets.CreatedDate, registration.RegistrationOrganization, registration.RegistrationNumber
            FROM pets
            JOIN persons_pets on pets.PetId = persons_pets.PetId
            JOIN persons on persons_pets.PersonId = persons.PersonId
            LEFT JOIN registration on registration.PetId = pets.PetId
            WHERE pets.Deleted = FALSE AND persons.Deleted = FALSE AND persons.PersonId = 1

-- Doing so reveals a few potential areas for slowdowns, the first being use of sequential scans. When
-- scanning registration for petId, persons_pets for personId, and pets for petId, all scans are done sequentially.
-- The most obvious optimization would be to add an index on the fields we search on:
CREATE UNIQUE INDEX IDX_registration_PetId on registration(petId);
CREATE UNIQUE INDEX IDX_personspets_PersonId on persons_pets(personId);
CREATE UNIQUE INDEX IDX_personspets_PetId on persons_pets(petId);

-- This change causes the database to perform index scans on each, instead of sequential scans.
-- Building these indexes on this database, even in just this example, changes the stats from:
-- Pre-index:  Nested Loop            (cost=46.54..76.11 rows=77 width=1632) 
-- Post-index: Nested Loop Left Join  (cost=0.60.. 24.91 rows=1  width=180)
-- Thus, the worst-case scenario for this query was cut by about 1/3.
