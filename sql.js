module.exports = {
    v1: {
        fetchProfile: `SELECT PersonId, FirstName, LastName, EmailAddress, CreatedDate
            FROM persons
            WHERE Deleted = FALSE AND PersonId = ?`,

        fetchPetsByPerson: `SELECT pets.PetId, pets.Name, pets.Species, pets.Breed, pets.Sex, pets.Birthdate, pets.CreatedDate
            FROM pets
            JOIN persons_pets on pets.PetId = persons_pets.PetId
            JOIN persons on persons_pets.PersonId = persons.PersonId
            WHERE pets.Deleted = FALSE AND persons.Deleted = FALSE AND persons.PersonId = ?`,

        fetchRecordsByPerson: `SELECT records.RecordId, records.Title, records.Url, records.CreatedDate
            FROM records
            JOIN pets on records.PetId = pets.PetId
            JOIN persons_pets on records.PetId = persons_pets.PetId
            JOIN persons on persons_pets.PersonId = persons.PersonId
            WHERE records.Deleted = FALSE AND pets.Deleted = FALSE AND persons.Deleted = FALSE AND persons.PersonId = ?`
    },
    v2: {
        fetchPetsByPerson: `SELECT pets.PetId, pets.Name, pets.Species, pets.Breed, pets.Sex,
            pets.Birthdate, pets.CreatedDate, registration.RegistrationOrganization, registration.RegistrationNumber
            FROM pets
            JOIN persons_pets on pets.PetId = persons_pets.PetId
            JOIN persons on persons_pets.PersonId = persons.PersonId
            LEFT JOIN registration on registration.PetId = pets.PetId
            WHERE pets.Deleted = FALSE AND persons.Deleted = FALSE AND persons.PersonId = ?`,
    }

}