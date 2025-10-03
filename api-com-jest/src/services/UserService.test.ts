import { CustomError } from "../errors/CustomError";
import { UserService } from "../services/UserService";
import { UserPost, UserWithAge } from "../types/UserType";
import bcrypt from "bcrypt";

describe("UserService - getUsersAll", () => {
  const mockGetUsersAll = jest.fn<Promise<UserWithAge[]>, []>();

  const mockRepository = {
    getUsersAll: mockGetUsersAll,
  };

  const service = new UserService(mockRepository as any);

  const expectedListUsers: UserWithAge[] = [
    {
      id_user: 1,
      name_user: "Thiago",
      email_user: "thiago@email.com",
      role_user: "admin",
      nasc_user: "01/01/2000",
      age_user: 25,
    },
    {
      id_user: 2,
      name_user: "Outro",
      email_user: "Outro@email.com",
      role_user: "user",
      nasc_user: "01/01/2000",
      age_user: 25,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar a lista de usuários com sucesso", async () => {
    mockGetUsersAll.mockResolvedValue(expectedListUsers);

    const result = await service.getUsersAll();

    expect(result).toEqual(expectedListUsers);

    expect(mockGetUsersAll).toHaveBeenCalled();
  });

  it("deve lançar erro se a lista de usuários estiver vazia ou for nula", async () => {
    mockGetUsersAll.mockResolvedValue([]);

    await expect(service.getUsersAll()).rejects.toThrow(
      "Nenhum usuário encontrado."
    );
  });

  it("deve lançar erro genérico caso ocorra algo inesperado", async () => {
    mockGetUsersAll.mockRejectedValue(new Error("Erro ao consultar usuários!"));

    await expect(service.getUsersAll()).rejects.toThrow(
      "Erro ao consultar usuários!"
    );
  });
});

describe("UserService - createUser", () => {
  // Mock tipado da função createUser
  const mockCreateUser = jest.fn<Promise<UserWithAge[]>, [UserPost]>();

  // MockRepository parcial com apenas o metedo que será usado
  const mockRepository = {
    createUser: mockCreateUser,
  };

  // Instancia o serviço com o mock
  const service = new UserService(mockRepository as any);

  const fakeUser: UserPost = {
    name_user: "Thiago",
    email_user: "thiago@email.com",
    role_user: "user",
    nasc_user: "2000-01-01",
    password_user: "123456",
  };

  const expectedUser: UserWithAge = {
    id_user: 1,
    name_user: "Thiago",
    email_user: "thiago@email.com",
    role_user: "user",
    nasc_user: "01/01/2000",
    age_user: 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar usuário com sucesso", async () => {
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(async () => "senhaCriptografada");

    // Mockando retorno do banco
    mockCreateUser.mockResolvedValue([expectedUser]);

    const result = await service.createUser({ ...fakeUser });

    expect(result).toEqual(expectedUser);

    expect(mockCreateUser).toHaveBeenCalledWith({
      ...fakeUser,
      password_user: "senhaCriptografada",
    });
  });

  it("deve lançar erro se retorno do DB for vazio", async () => {
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(async () => "senhaCriptografada");

    mockCreateUser.mockResolvedValue([]);

    await expect(service.createUser({ ...fakeUser })).rejects.toThrow(
      "Não foi possível criar o usuário!"
    );
  });

  it("deve lançar erro se email já estiver em uso (code 23505)", async () => {
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(async () => "senhaCriptografada");

    const error = { original: { code: "23505" } };
    mockCreateUser.mockRejectedValue(error);

    await expect(service.createUser({ ...fakeUser })).rejects.toThrow(
      "Este email já está sendo utilizado por outro usuário!"
    );
  });

  it("deve lançar erro genérico caso ocorra algo inesperado", async () => {
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(async () => "senhaCriptografada");

    mockCreateUser.mockRejectedValue(new Error("Falha"));

    await expect(service.createUser({ ...fakeUser })).rejects.toThrow(
      "Erro ao criar usuário!"
    );
  });
});
