import { ReactNode, useState } from "react";
import {
  useFloating,
  useHover,
  useInteractions,
  useDismiss,
  useRole,
  offset,
  flip,
  shift,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useFloatingNodeId,
  FloatingNode,
} from "@floating-ui/react";
import "./Popover.scss"

interface PopoverProps {
  children: any;
  label: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const nodeId = useFloatingNodeId();

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start",
    middleware: [offset(12), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  

  const hover = useHover(context, {
    restMs: 350,
    move: false,
    delay: { open: 200, close: 350 },
    handleClose: safePolygon({
      buffer: 1.5,
      requireIntent: false
    }),
  });

  const dismiss = useDismiss(context);

  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  return (
    <>
      <span
      className="popover"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children}
      </span>
      <FloatingNode id={nodeId}>
        {isOpen && (
          <FloatingPortal>
            <div
              className="popover__content"
              ref={refs.setFloating}
              {...getFloatingProps()}
              style={{
                ...floatingStyles,
              }}
            >
              {label}
            </div>
          </FloatingPortal>
        )}
      </FloatingNode>
    </>
  );
};

export default Popover;