import "./Tooltip.scss";
import { ReactNode, useRef, useState } from "react";
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
    FloatingPortal,
    arrow,
    FloatingArrow,
} from "@floating-ui/react";

interface TooltipProps {
    children: any;
    label: ReactNode;
    className: string;
}

export const Tooltip: React.FC<TooltipProps> = ({children, label, className}) => {
    const [isOpen, setIsOpen] = useState(false);

    const arrowRef = useRef(null);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom",
        middleware: [arrow({element: arrowRef,}),offset(6), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
        restMs: 350,
        move: false,
        delay: { open: 200, close: 350 }
    });

    const dismiss = useDismiss(context);

    const role = useRole(context, { role: "tooltip" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        dismiss,
        role,
    ]);

    return (
        <>
            <span
            className="tooltip"
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                {children}
            </span>
            {isOpen && (
            <FloatingPortal>
                <div
                    className={"tooltip__content " + className + "__content"}
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                    style={{
                        ...floatingStyles,
                    }}
                >
                    <FloatingArrow ref={arrowRef} context={context} className={"tooltip__arrow " + className + "__arrow"}/>
                    {label}
                </div>
            </FloatingPortal>
            )}
        </>
    )
}

export default Tooltip;



