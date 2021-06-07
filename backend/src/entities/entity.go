package entities

import "github.com/google/uuid"

type ID = uuid.UUID

func UUID() ID {
	return ID(uuid.New())
}

func StringToID(s string) (ID, error) {
	id, err := uuid.Parse(s)
	return ID(id), err
}
