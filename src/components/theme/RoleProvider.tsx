import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

interface RoleContextType {
  role: "admin" | "user" | null;
}

const RoleContext = createContext<RoleContextType>({
  role: null,
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setRole(null);
        document.documentElement.classList.remove("admin", "user");
        return;
      }

      // 🔥 Firebase se role fetch
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();

      const userRole = data?.role || "user";
      setRole(userRole);

      // 🔥 HTML pe role class auto
      document.documentElement.classList.remove("admin", "user");
      document.documentElement.classList.add(userRole);
    });

    return () => sub();
  }, []);

  return (
    <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);
