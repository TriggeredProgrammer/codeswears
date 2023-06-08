import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";

const Myaccount = () => {
  let router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return <div>This is my account page</div>;
};

export default Myaccount;
