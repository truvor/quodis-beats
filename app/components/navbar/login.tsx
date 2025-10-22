import React from "react";
import Link from "next/link";

export default function Login({handleClick}: {handleClick: ()=> void}) {
  return (<li><Link onClick={handleClick}
                    href='/login'><span>Login</span></Link></li>
  );
}