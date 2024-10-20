import Terminal from "@/Components/Core/Terminal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useEffect, useRef, useState } from "react";

export default function Assessment() {
  const terminalRef = useRef<{
    writeMessage: (msg: string) => void;
    flush: () => void;
  }>();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.writeMessage("Damn bro this shit workds");
    }
  }, []);

  return (
    <Authenticated header={true}>
      <Terminal ref={terminalRef} />
    </Authenticated>
  );
}
