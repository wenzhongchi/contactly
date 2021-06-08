package utils

import (
	"math/rand"
	"time"
)

func randomNumber(min, max int32) int32 {
	rand.Seed(time.Now().UnixNano())
	return min + int32(rand.Intn(int(max-min)))
}

func randomStringGenerator(charSet string, codeLength int32) string {
	code := ""
	charSetLength := int32(len(charSet))
	for i := int32(0); i < codeLength; i++ {
		index := randomNumber(0, charSetLength)
		code += string(charSet[index])
	}

	return code
}

func GenerateRandomStrongPassword() string {
	charSet := "RW!Vx&6fMHyPYSB1da*4LTm3ki@5c2ptgDzZ9Gq8w7Ke$XNE#s_jvrJuQnFCAUbh"
	pass := randomStringGenerator(charSet, 12)
	return pass
}

func GenerateOTP() string {
	charSet := "0123456789"
	pass := randomStringGenerator(charSet, 4) + "-" + randomStringGenerator(charSet, 4)
	return pass
}
