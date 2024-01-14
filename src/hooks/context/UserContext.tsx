import { createContext, Dispatch, SetStateAction } from 'react';

interface UserContextType {
  userId: number | null;
  name: string | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  setName: Dispatch<SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
