import { useMemo, useEffect, ReactNode } from "react";

import { createPortal } from "react-dom";

interface PortalWrapProps {
  children: ReactNode;
}

export const PortalWrap = ({ children }: PortalWrapProps) => {
  // div tag 생성
  const subDiv = useMemo(() => document.createElement("div"), []);
  useEffect(() => {
    subDiv.id = "portal-wrap";
    document.body.appendChild(subDiv);
    return () => subDiv.remove();
  }, [subDiv]);
  return createPortal(<>{children}</>, subDiv);
};
