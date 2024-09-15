type Address = {
  Line1: string;
  Line2: string;
  Line3: string;
  PostCode: string;
};

type Contact = {
  FirstName: string;
  LastName: string;
  Company: string;
  Address: Address;
  Email: string;
  PhoneNo: string;
  ServiceStart: string;
  ServiceFreq: number;
};

export { type Contact };
