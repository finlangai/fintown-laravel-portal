import { useTerminal } from "@/Hooks/useTerminal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useEffect, useRef, useState } from "react";

export default function Assessment() {
  const { writeMessage } = useTerminal();

  useEffect(() => {
    writeMessage("Damn bro wtf");
  }, []);

  return (
    <Authenticated header={true}>
      <p>damn</p>
    </Authenticated>
  );
}
