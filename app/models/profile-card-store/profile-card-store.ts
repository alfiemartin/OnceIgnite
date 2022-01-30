import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProfileCardModel, ProfileCardSnapshot } from "../profile-card/profile-card"
import { mockProfileCardData } from "../../../mockData"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty characters
 */
export const ProfileCardStoreModel = types
  .model("ProfileCardStore")
  .props({
    profiles: types.optional(types.array(ProfileCardModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveProfileCards: (ProfileCardSnapshots: ProfileCardSnapshot[]) => {
      self.profiles.replace(ProfileCardSnapshots)
    },
  }))
  .actions((self) => ({
    getProfileCards: async () => {
      const results = mockProfileCardData

      self.saveProfileCards(results)
    },
  }))

type ProfileCardStoreType = Instance<typeof ProfileCardStoreModel>
export interface ProfileCardStore extends ProfileCardStoreType {}
type ProfileCardStoreSnapshotType = SnapshotOut<typeof ProfileCardStoreModel>
export interface ProfileCardStoreSnapshot extends ProfileCardStoreSnapshotType {}
export const createCharacterStoreDefaultModel = () => types.optional(ProfileCardStoreModel, {})
