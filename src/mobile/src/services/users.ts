interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
}

const ceo: User = {
  id: "181df598-96bd-4498-ba6c-492283ea810e",
  name: "Carla Perez",
  role: "CEO",
  email: "carla@ceo.com",
  password: "123456",
};

const fdc: User = {
  id: "3496510c-b387-4495-984d-e2d6f7d71a4b",
  name: "Adriana",
  role: "FDC",
  email: "adriana@fdc.com",
  password: "123456",
};

export { User, ceo, fdc}