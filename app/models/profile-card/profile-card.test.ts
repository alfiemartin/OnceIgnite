import { ProfileCardModel } from "./profile-card"

test("can be created", () => {
  const instance = ProfileCardModel.create({})

  expect(instance).toBeTruthy()
})
