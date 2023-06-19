const User = require('../../../models/schemas/User');
const db = require('../../../lib/mongo');
const userService = require('../index');

const createUserMock = {
  full_name: 'name',
  email: 'name@email.com',
  password: 'Pass123$'
};

describe('UserService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  })

  afterAll(() => {
    db.close();
  })

  it('create - Should return created user', async () => {
    jest.spyOn(User.prototype, 'save').mockResolvedValue(true);

    const user = await userService.create(createUserMock);

    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('full_name');
    expect(user.full_name).toBe(createUserMock.full_name);
    expect(user).toHaveProperty('email');
    expect(user.email).toBe(createUserMock.email);
    expect(user).toHaveProperty('salt');
    expect(user).toHaveProperty('hashed_password');
  })

  it('create - Should Fail if required missing', async () => {
    await expect(
      userService.create({ email: createUserMock.email })
    ).rejects.toBeInstanceOf(Error);
  })

  it('getList - Should Return List of users', async () => {
    jest.spyOn(User, 'find').mockResolvedValue([createUserMock]);

    const users = await userService.getList();

    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  })

  it('getList - Should Fail if required missing', async () => {
    jest.spyOn(User, 'find').mockRejectedValue(new Error('Some error'));

    await expect(
      userService.getList()
    ).rejects.toBeInstanceOf(Error);
  })

  it('getOne - Should return a user', async () => {
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
      return new User(createUserMock)
    });

    const user = await userService.getOne({ email: createUserMock.email });

    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('full_name');
    expect(user.full_name).toBe(createUserMock.full_name);
    expect(user).toHaveProperty('email');
    expect(user.email).toBe(createUserMock.email);
    expect(user).toHaveProperty('salt');
    expect(user).toHaveProperty('hashed_password');
  })

  it('getOne - Should Fail on some error', async () => {
    jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Some error'));

    await expect(
      userService.getOne({ email: createUserMock.email })
    ).rejects.toBeInstanceOf(Error);
  })

  it('getOneByEmail - Should return a user', async () => {
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
      return new User(createUserMock)
    });

    const user = await userService.getOneByEmail(createUserMock.email);

    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('full_name');
    expect(user.full_name).toBe(createUserMock.full_name);
    expect(user).toHaveProperty('email');
    expect(user.email).toBe(createUserMock.email);
    expect(user).toHaveProperty('salt');
    expect(user).toHaveProperty('hashed_password');
  })

  it('getOneByEmail - Should Fail on some error', async () => {
    jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Some error'));

    await expect(
      userService.getOneByEmail(createUserMock.email)
    ).rejects.toBeInstanceOf(Error);
  })

  it('isRegisteredWithEmail - Should return a number', async () => {
    jest.spyOn(User, 'countDocuments').mockResolvedValue(1);

    const isRegistered = await userService.isRegisteredWithEmail(createUserMock.email);

    expect(typeof isRegistered).toBe('boolean');
  })

  it('isRegisteredWithEmail - Should Fail on some error', async () => {
    jest.spyOn(User, 'countDocuments').mockRejectedValue(new Error('Some error'));

    await expect(
      userService.isRegisteredWithEmail(createUserMock.email)
    ).rejects.toBeInstanceOf(Error);
  })

  it('getRecoveryAttemptCountByEmail - Should return a number', async () => {
    jest.spyOn(User, 'aggregate').mockResolvedValue([{count: 1}]);

    const count = await userService.getRecoveryAttemptCountByEmail(createUserMock.email);

    expect(typeof count).toBe('number');
  })

  it('getRecoveryAttemptCountByEmail - Should return null', async () => {
    jest.spyOn(User, 'aggregate').mockResolvedValue([]);

    const count = await userService.getRecoveryAttemptCountByEmail(createUserMock.email);

    expect(count).toBeNull();
  })

  it('getRecoveryAttemptCountByEmail - Should Fail on some error', async () => {
    jest.spyOn(User, 'aggregate').mockRejectedValue(new Error('Some error'));

    await expect(
      userService.getRecoveryAttemptCountByEmail(createUserMock.email)
    ).rejects.toBeInstanceOf(Error);
  })
})