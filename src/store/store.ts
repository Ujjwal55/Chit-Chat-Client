import { create } from 'zustand'

interface IAuthState {
  user: any;
  setUser: (user: any) => void;
}

const useAuthStore = create<IAuthState>()((set) => ({
  user: null,
  setUser: (newUser) => {
    return set((state) => ({
      ...state,
      user: newUser,
    }))
  },
}))

export default useAuthStore