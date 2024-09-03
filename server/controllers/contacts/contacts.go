package contacts

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Address struct {
	Line1    string
	Line2    string
	Line3    string
	PostCode string
}

type Contact struct {
	FirstName    string
	LastName     string
	Company      string
	Address      Address
	Email        string
	PhoneNo      string
	ServiceStart string
	ServiceFreq  int64
}

var contacts = []Contact{
	{
		FirstName: "Liam",
		LastName:  "O'Neill",
		Company:   "PrimeTech Solutions",
		Address: Address{
			Line1:    "123 Maple Street",
			Line2:    "Belfast",
			Line3:    "",
			PostCode: "BT1 2BE",
		},
		Email:        "liam.oneill@primetech.co.uk",
		PhoneNo:      "07894561234",
		ServiceStart: "2020-01-15",
		ServiceFreq:  12,
	},
	{
		FirstName: "Emily",
		LastName:  "Smith",
		Company:   "GreenLeaf Gardening",
		Address: Address{
			Line1:    "456 Elm Road",
			Line2:    "Edinburgh",
			Line3:    "",
			PostCode: "EH4 3DP",
		},
		Email:        "emily.smith@greenleaf.com",
		PhoneNo:      "07986451234",
		ServiceStart: "2019-08-22",
		ServiceFreq:  3,
	},
	{
		FirstName: "Jacob",
		LastName:  "Mason",
		Company:   "Mason Builders",
		Address: Address{
			Line1:    "789 Oak Avenue",
			Line2:    "Leeds",
			Line3:    "",
			PostCode: "LS1 4AJ",
		},
		Email:        "jacob.mason@masonbuilders.co.uk",
		PhoneNo:      "07783456123",
		ServiceStart: "2018-03-10",
		ServiceFreq:  6,
	},
	{
		FirstName: "Olivia",
		LastName:  "Johnson",
		Company:   "TechWave",
		Address: Address{
			Line1:    "321 Pine Street",
			Line2:    "Manchester",
			Line3:    "",
			PostCode: "M1 2DD",
		},
		Email:        "olivia.johnson@techwave.com",
		PhoneNo:      "07562348912",
		ServiceStart: "2021-07-18",
		ServiceFreq:  4,
	},
	{
		FirstName: "Noah",
		LastName:  "Williams",
		Company:   "Williams & Co.",
		Address: Address{
			Line1:    "654 Cedar Road",
			Line2:    "Glasgow",
			Line3:    "",
			PostCode: "G1 3HL",
		},
		Email:        "noah.williams@williamsco.co.uk",
		PhoneNo:      "07856423145",
		ServiceStart: "2017-05-29",
		ServiceFreq:  8,
	},
	{
		FirstName: "Ava",
		LastName:  "Brown",
		Company:   "Brown Consulting",
		Address: Address{
			Line1:    "987 Birch Avenue",
			Line2:    "Cardiff",
			Line3:    "",
			PostCode: "CF10 2HQ",
		},
		Email:        "ava.brown@brownconsulting.com",
		PhoneNo:      "07791234567",
		ServiceStart: "2016-09-14",
		ServiceFreq:  5,
	},
	{
		FirstName: "James",
		LastName:  "Davis",
		Company:   "Davis Financial",
		Address: Address{
			Line1:    "159 Ash Road",
			Line2:    "Bristol",
			Line3:    "",
			PostCode: "BS1 5TR",
		},
		Email:        "james.davis@davisfinancial.co.uk",
		PhoneNo:      "07912345678",
		ServiceStart: "2018-11-03",
		ServiceFreq:  7,
	},
	{
		FirstName: "Isabella",
		LastName:  "Wilson",
		Company:   "Wilson Design",
		Address: Address{
			Line1:    "246 Poplar Street",
			Line2:    "London",
			Line3:    "",
			PostCode: "SW1A 1AA",
		},
		Email:        "isabella.wilson@wilsondesign.com",
		PhoneNo:      "07894561234",
		ServiceStart: "2020-02-21",
		ServiceFreq:  9,
	},
	{
		FirstName: "Lucas",
		LastName:  "Evans",
		Company:   "Evans Law",
		Address: Address{
			Line1:    "369 Fir Lane",
			Line2:    "Liverpool",
			Line3:    "",
			PostCode: "L1 1JQ",
		},
		Email:        "lucas.evans@evanslaw.co.uk",
		PhoneNo:      "07564321897",
		ServiceStart: "2019-06-12",
		ServiceFreq:  6,
	},
	{
		FirstName: "Mia",
		LastName:  "Thomas",
		Company:   "Thomas Real Estate",
		Address: Address{
			Line1:    "741 Willow Way",
			Line2:    "Sheffield",
			Line3:    "",
			PostCode: "S1 2DR",
		},
		Email:        "mia.thomas@thomasrealestate.com",
		PhoneNo:      "07784561234",
		ServiceStart: "2021-03-07",
		ServiceFreq:  4,
	},
}

func Controller(c *gin.Context) {
	user, hasUser := c.Get("User")
	if !hasUser {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "User not found.",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"contacts":     contacts,
		"VerifiedUser": user,
	})
}
