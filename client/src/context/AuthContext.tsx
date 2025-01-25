import { useState } from "react";

export const AuthProvider: React.FC = ({ children: ReactNode }) => {
    const [user, setUser] = useState<null>(null);
    
}

