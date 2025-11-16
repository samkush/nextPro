"use client";

import { Toaster } from "sonner";

export function GlobalToaster() {
    return (
        <Toaster
        richColors
        position="top-right"
        closeButton
        duration={3000}
        />
    )
}
