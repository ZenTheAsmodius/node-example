const PasswordRecovery = require('../../../models/schemas/PasswordRecovery');
const db = require('../../../lib/mongo');
const pwRecoveryService = require('../index');

const createPwRecMock = {
  email: 'name@email.com',
};

describe('UserService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  })

  afterAll(() => {
    db.close();
  })

  it('create - Should return created Password Recovery', async () => {
    jest.spyOn(PasswordRecovery.prototype, 'save').mockResolvedValue(true);

    const pwRecovery = await pwRecoveryService.create(createPwRecMock);

    expect(pwRecovery).toHaveProperty('_id');
    expect(pwRecovery).toHaveProperty('email');
    expect(pwRecovery.email).toBe(createPwRecMock.email);
    expect(pwRecovery).toHaveProperty('code');
  })

  it('create - Should Fail if required missing', async () => {
    jest.spyOn(PasswordRecovery, 'find').mockRejectedValue(new Error('Some error'));

    await expect(
      pwRecoveryService.create(createPwRecMock)
    ).rejects.toBeInstanceOf(Error);
  })

  it('getList - Should Return List of Password Recoveries', async () => {
    jest.spyOn(PasswordRecovery, 'find').mockImplementationOnce(() => {
      return new PasswordRecovery(createPwRecMock)
    });

    const pwRecoveries = await pwRecoveryService.getList();

    expect(pwRecoveries).toBeInstanceOf(Array);
    expect(pwRecoveries.length).toBeGreaterThan(0);
  })

  it('getList - Should Fail if required missing', async () => {
    jest.spyOn(PasswordRecovery, 'find').mockRejectedValue(new Error('Some error'));

    await expect(
      pwRecoveryService.getList()
    ).rejects.toBeInstanceOf(Error);
  })

  it('getOne - Should return a Password Recovery', async () => {
    jest.spyOn(PasswordRecovery, 'findOne').mockImplementationOnce(() => {
      return new PasswordRecovery(createPwRecMock)
    });

    const pwRecovery = await pwRecoveryService.getOne({ email: createPwRecMock.email });

    expect(pwRecovery).toHaveProperty('_id');
    expect(pwRecovery).toHaveProperty('email');
    expect(pwRecovery.email).toBe(createPwRecMock.email);
    expect(pwRecovery).toHaveProperty('code');
  })

  it('getOne - Should Fail on some error', async () => {
    jest.spyOn(PasswordRecovery, 'findOne').mockRejectedValue(new Error('Some error'));

    await expect(
      pwRecoveryService.getOne({ email: createPwRecMock.email })
    ).rejects.toBeInstanceOf(Error);
  })

  it('clean - Should return a true', async () => {
    jest.spyOn(PasswordRecovery, 'deleteMany').mockResolvedValue(true);

    const isCleaned = await pwRecoveryService.clean(createPwRecMock.email);

    expect(isCleaned).toBe(true);
  })

  it('clean - Should Fail on some error', async () => {
    jest.spyOn(PasswordRecovery, 'deleteMany').mockRejectedValue(new Error('Some error'));

    await expect(
      pwRecoveryService.clean(createPwRecMock.email)
    ).rejects.toBeInstanceOf(Error);
  })
})