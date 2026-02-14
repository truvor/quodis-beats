import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Login({ handleClick }: { handleClick: () => void }) {
  const supabase = createClient();
  const [label, setLabel] = useState("Login\u00A0\u00A0");
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const newVal = session?.user ? true : undefined;
      setLoggedIn(newVal);
      setLabel(newVal ? "Logout" : "Login\u00A0\u00A0");
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleLogin = async () => {
    handleClick();
    if (loggedIn) {
      await supabase.auth.signOut();
      setLoggedIn(undefined);
      setLabel("Login\u00A0\u00A0");
    }
    router.push("/login");
  };

  return (
    <li>
      <button onClick={toggleLogin}>
        <span>{label}</span>
      </button>
    </li>
  );
}
