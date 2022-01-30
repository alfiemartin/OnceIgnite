import { ProfileCardStoreModel } from "./profile-card-store"

test("can be created", () => {
  const instance = ProfileCardStoreModel.create({})

  expect(instance).toBeTruthy()
})
