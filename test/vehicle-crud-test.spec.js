const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../server");

chai.use(chaiHttp);

describe("CRUD Operations for Vehicles", () => {
  let vehicleId;

  // Teste para criar um veículo (POST)
  it("should create a new vehicle", (done) => {
    const vehicle = {
      brand: "Toyota",
      model: "Corolla",
      year: 2020,
    };

    chai
      .request(server)
      .post("/api/vehicles")
      .send(vehicle)
      .end((err, res) => {
        expect(res.status).to.equal(201); // Espera-se um status 201 para criação
        expect(res.body).to.have.property("id");
        expect(res.body.brand).to.equal(vehicle.brand);
        expect(res.body.model).to.equal(vehicle.model);
        vehicleId = res.body.id; // Guarda o id do veículo criado
        done();
      });
  });

  // Teste para listar todos os veículos (GET)
  it("should get all vehicles", (done) => {
    chai
      .request(server)
      .get("/api/vehicles")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  // Teste para obter um veículo específico (GET /vehicles/:id)
  it("should get a specific vehicle by id", (done) => {
    chai
      .request(server)
      .get(`/api/vehicles/${vehicleId}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id").that.equals(vehicleId);
        done();
      });
  });

  // Teste para atualizar um veículo (PUT)
  it("should update a vehicle", (done) => {
    const updatedVehicle = {
      brand: "Toyota",
      model: "Camry",
      year: 2021,
    };

    chai
      .request(server)
      .put(`/api/vehicles/${vehicleId}`)
      .send(updatedVehicle)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.brand).to.equal(updatedVehicle.brand);
        expect(res.body.model).to.equal(updatedVehicle.model);
        done();
      });
  });

  // Teste para excluir um veículo (DELETE)
  it("should delete a vehicle", (done) => {
    chai
      .request(server)
      .delete(`/api/vehicles/${vehicleId}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("message")
          .that.equals("Veículo deletado com sucesso");
        done();
      });
  });
});
